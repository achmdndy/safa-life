import { useRealm } from "@realm/react";
import * as Location from "expo-location";
import { useEffect, useMemo, useState } from "react";
import { useGetPrayertimesMonthlyHook } from "@/api/coreService";
import type { DtoPrayerTimesListResponse } from "@/api/coreService/types";
import type { DtoPrayerTimesResponse } from "@/api/coreService/types/dto/PrayerTimesResponse.ts";
import { scheduleRealmJob } from "@/lib/realm/job-queue";
import type { PrayerTimesMonthType } from "@/schemas/realms/prayertimes";

export type PrayerName = "Fajr" | "Dhuhr" | "Asr" | "Maghrib" | "Isha";

export type DailyPrayerTimes = {
	date: string;
	timezone?: string;
	fajr?: string;
	sunrise?: string;
	dhuhr?: string;
	asr?: string;
	maghrib?: string;
	isha?: string;
};

export type MonthlyPrayerTimes = {
	items: DailyPrayerTimes[];
};

export type CountdownState = {
	hours: number;
	minutes: number;
	seconds: number;
	progressPct: number; // 0..100
};

type LocationInfo = {
	latitude: number;
	longitude: number;
	timezone: string;
};

function buildKey(loc: LocationInfo, month: number, year: number): string {
	return `${loc.timezone}|${loc.latitude}|${loc.longitude}|${year}|${month}`;
}

// Normalize input date strings like "YYYY-M-D" to strict "YYYY-MM-DD"
function normalizeDateString(date?: string): string {
	if (!date) return "";
	const parts = date.split("-");
	if (parts.length !== 3) return date;
	const [y, m, d] = parts;
	const mm = String(Number(m)).padStart(2, "0");
	const dd = String(Number(d)).padStart(2, "0");
	return `${y}-${mm}-${dd}`;
}

function parseItems(data?: DtoPrayerTimesListResponse): MonthlyPrayerTimes {
	const items: DailyPrayerTimes[] = (data?.items ?? []).map(
		(d: DtoPrayerTimesResponse) => ({
			date: normalizeDateString(d.date ?? ""),
			timezone: d.timezone,
			fajr: d.fajr,
			sunrise: d.sunrise,
			dhuhr: d.dhuhr,
			asr: d.asr,
			maghrib: d.maghrib,
			isha: d.isha,
		}),
	);
	return { items };
}

function toDateLocal(dateStr: string, timeStr?: string): Date | undefined {
	if (!dateStr || !timeStr) return undefined;
	// Expect timeStr like "HH:mm"; build a local Date using device timezone
	const [hStr, mStr] = timeStr.split(":");
	const ymd = dateStr.split("-");
	if (ymd.length !== 3) return undefined;
	const year = Number(ymd[0]);
	const monthIndex = Number(ymd[1]) - 1; // 0-based
	const day = Number(ymd[2]);
	const hours = Number(hStr);
	const minutes = Number(mStr);
	const d = new Date(year, monthIndex, day, hours, minutes, 0, 0);
	return d;
}

export function useHomePrayerTimes() {
	const realm = useRealm();
	const now = new Date();
	const [loc, setLoc] = useState<LocationInfo | null>(null);
	const [storedMonthly, setStoredMonthly] = useState<MonthlyPrayerTimes | null>(
		null,
	);
	const [countdown, setCountdown] = useState<CountdownState>({
		hours: 0,
		minutes: 0,
		seconds: 0,
		progressPct: 0,
	});

	// Acquire location and timezone accurately
	useEffect(() => {
		let mounted = true;
		(async () => {
			try {
				const { status } = await Location.requestForegroundPermissionsAsync();
				if (status !== Location.PermissionStatus.GRANTED) {
					// Fallback to approximate via last known or default 0,0 (will still fetch but likely fail gracefully)
					const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "UTC";
					if (mounted) setLoc({ latitude: 0, longitude: 0, timezone: tz });
					return;
				}
				const pos = await Location.getCurrentPositionAsync({
					accuracy: Location.Accuracy.High,
				});
				const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "UTC";
				if (mounted)
					setLoc({
						latitude: pos.coords.latitude,
						longitude: pos.coords.longitude,
						timezone: tz,
					});
			} catch {
				const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "UTC";
				if (mounted) setLoc({ latitude: 0, longitude: 0, timezone: tz });
			}
		})();
		return () => {
			mounted = false;
		};
	}, []);

	const month = now.getMonth() + 1;
	const year = now.getFullYear();
	const isFirstDay = now.getDate() === 1;

	// Read from Realm first
	useEffect(() => {
		if (!loc) return;
		try {
			const key = buildKey(loc, month, year);
			const found = realm.objectForPrimaryKey<PrayerTimesMonthType>(
				"PrayerTimesMonth",
				key,
			);

			if (found?.dataJson) {
				try {
					const parsed = JSON.parse(found.dataJson) as MonthlyPrayerTimes;
					setStoredMonthly(parsed);
				} catch {
					setStoredMonthly(null);
				}
			} else {
				setStoredMonthly(null);
			}
		} catch {
			setStoredMonthly(null);
		}
	}, [realm, loc, month, year]);

	const shouldFetch = useMemo(() => {
		if (!loc) return false;
		return isFirstDay || storedMonthly == null;
	}, [loc, isFirstDay, storedMonthly]);

	const { data, isSuccess, isLoading, error } = useGetPrayertimesMonthlyHook(
		loc
			? {
					latitude: loc.latitude,
					longitude: loc.longitude,
					timezone: loc.timezone,
					month,
					year,
				}
			: // Dummy params to keep types; disabled via query.options.enabled below
				{ latitude: 0, longitude: 0, timezone: "UTC", month, year },
		{
			query: {
				enabled: !!loc && shouldFetch,
				refetchOnReconnect: true,
				refetchOnMount: false,
				retry: 1,
			},
		},
	);

	// Persist to Realm when fetched
	useEffect(() => {
		if (!loc) return;
		if (!isSuccess || !data?.data) return;
		const key = buildKey(loc, month, year);
		const monthlyParsed = parseItems(data.data);
		scheduleRealmJob(
			"Sync prayer times monthly",
			() =>
				new Promise<void>((resolve) => {
					realm.write(() => {
						const existing = realm.objectForPrimaryKey<PrayerTimesMonthType>(
							"PrayerTimesMonth",
							key,
						);
						if (existing) {
							existing.timezone = loc.timezone;
							existing.latitude = loc.latitude;
							existing.longitude = loc.longitude;
							existing.month = month;
							existing.year = year;
							existing.dataJson = JSON.stringify(monthlyParsed);
							existing.updatedAt = new Date().toISOString();
						} else {
							realm.create("PrayerTimesMonth", {
								key,
								timezone: loc.timezone,
								latitude: loc.latitude,
								longitude: loc.longitude,
								month,
								year,
								dataJson: JSON.stringify(monthlyParsed),
								createdAt: new Date().toISOString(),
								updatedAt: new Date().toISOString(),
							});
						}
					});
					resolve();
				}),
		);
		setStoredMonthly(monthlyParsed);
	}, [realm, isSuccess, data, loc, month, year]);

	const today: DailyPrayerTimes | undefined = useMemo(() => {
		const dStr = `${year}-${String(month).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
		const items = storedMonthly?.items ?? [];
		return items.find((i) => normalizeDateString(i.date) === dStr);
	}, [storedMonthly, now, month, year]);

	const nextPrayer = useMemo(() => {
		if (!today) return undefined;
		const order: Array<{ key: keyof DailyPrayerTimes; label: PrayerName }> = [
			{ key: "fajr", label: "Fajr" },
			{ key: "dhuhr", label: "Dhuhr" },
			{ key: "asr", label: "Asr" },
			{ key: "maghrib", label: "Maghrib" },
			{ key: "isha", label: "Isha" },
		];
		const nowTime = now.getTime();
		for (const p of order) {
			const d = toDateLocal(today.date, today[p.key] as string | undefined);
			if (d && d.getTime() > nowTime) {
				return {
					name: p.label,
					time: d,
					remainingMs: d.getTime() - nowTime,
				};
			}
		}
		// If none ahead today, next is tomorrow's Fajr if available
		const items = storedMonthly?.items ?? [];
		const todayIdx = items.findIndex((i) => i.date === today.date);
		const tomorrow = todayIdx >= 0 ? items[todayIdx + 1] : undefined;
		const d = tomorrow ? toDateLocal(tomorrow.date, tomorrow.fajr) : undefined;
		if (d) {
			return { name: "Fajr", time: d, remainingMs: d.getTime() - nowTime };
		}
		return undefined;
	}, [today, storedMonthly, now]);

	const previousPrayerTime = useMemo(() => {
		if (!today) return undefined;
		const order: Array<{ key: keyof DailyPrayerTimes; label: PrayerName }> = [
			{ key: "fajr", label: "Fajr" },
			{ key: "dhuhr", label: "Dhuhr" },
			{ key: "asr", label: "Asr" },
			{ key: "maghrib", label: "Maghrib" },
			{ key: "isha", label: "Isha" },
		];
		const nowDate = new Date();
		let lastTime: Date | undefined;
		for (const p of order) {
			const val = today[p.key] as string | undefined;
			if (!val) continue;
			const d = toDateLocal(today.date, val);
			if (d && d.getTime() <= nowDate.getTime()) {
				lastTime = d;
			}
		}
		return lastTime;
	}, [today]);

	useEffect(() => {
		const id = setInterval(() => {
			if (!nextPrayer?.time) return;
			const nowMs = Date.now();
			const end = nextPrayer.time.getTime();
			const remainingMs = Math.max(0, end - nowMs);
			const hours = Math.floor(remainingMs / (1000 * 60 * 60));
			const minutes = Math.floor(
				(remainingMs % (1000 * 60 * 60)) / (1000 * 60),
			);
			const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);

			let progressPct = 0;
			if (previousPrayerTime) {
				const start = previousPrayerTime.getTime();
				const totalWindow = end - start;
				const progressed = nowMs - start;
				progressPct =
					totalWindow > 0
						? Math.min(100, Math.max(0, (progressed / totalWindow) * 100))
						: 0;
			}

			setCountdown({ hours, minutes, seconds, progressPct });
		}, 1000);
		return () => clearInterval(id);
	}, [nextPrayer, previousPrayerTime]);

	return {
		isLoading: !loc || isLoading,
		error,
		location: loc ?? undefined,
		monthly: storedMonthly ?? undefined,
		today,
		nextPrayer,
		countdown,
	};
}
