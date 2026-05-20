import Realm from "realm";

export class PrayerTimesMonth extends Realm.Object<PrayerTimesMonth> {
  key!: string; // tz|lat|lon|year|month
  timezone!: string;
  latitude!: number;
  longitude!: number;
  month!: number; // 1..12
  year!: number; // e.g., 2025
  // Store raw API items as JSON string to keep schema simple and typed on parse
  dataJson?: string;
  createdAt?: string; // ISO
  updatedAt?: string; // ISO

  static schema: Realm.ObjectSchema = {
    name: "PrayerTimesMonth",
    primaryKey: "key",
    properties: {
      key: "string",
      timezone: "string",
      latitude: "double",
      longitude: "double",
      month: "int",
      year: "int",
      dataJson: "string?",
      createdAt: "string?",
      updatedAt: "string?",
    },
  };
}

export type PrayerTimesMonthType = PrayerTimesMonth;