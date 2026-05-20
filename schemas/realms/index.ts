import { Translation } from "./translation";
import { QuranSurah } from "./quran";
import { PrayerTimesMonth } from "./prayertimes";
import type Realm from "realm";
import type { QuranSurah as QuranSurahType } from "./quran";
import type { PrayerTimesMonthType } from "./prayertimes";

export const schemas = [Translation, QuranSurah, PrayerTimesMonth];

// Increment this number whenever Realm schema changes
// Bump this when schema changes
export const schemaVersion = 2;

// Simple forward migration: let Realm create new tables/fields; optionally transform data
export function migration(oldRealm: Realm, newRealm: Realm) {
  // v0 -> v1: ensure defaults and safe updates
  if (oldRealm.schemaVersion < 1) {
    try {
      const surahs = newRealm.objects<QuranSurahType>("QuranSurah");
      for (let i = 0; i < surahs.length; i++) {
        const s = surahs[i];
        if (s.ayahCount == null) s.ayahCount = 0;
        if (s.nameArabic == null) s.nameArabic = "";
        if (s.nameEnglish == null) s.nameEnglish = "";
        if (s.revelationPlace == null) s.revelationPlace = "";
      }
    } catch {}

    try {
      const translations = newRealm.objects<Translation>("Translation");
      for (let i = 0; i < translations.length; i++) {
        const t = translations[i];
        if (t.language == null) t.language = "id";
        if (t.namespace == null) t.namespace = "language";
        if (t.data == null) t.data = "{}";
      }
    } catch {}
  }
  // v1 -> v2: ensure PrayerTimesMonth table exists; set defaults
  if (oldRealm.schemaVersion < 2) {
    try {
      const months = newRealm.objects<PrayerTimesMonthType>("PrayerTimesMonth");
      for (let i = 0; i < months.length; i++) {
        const m = months[i];
        if (m.dataJson == null) m.dataJson = "{}";
        if (m.createdAt == null) m.createdAt = new Date().toISOString();
        if (m.updatedAt == null) m.updatedAt = m.createdAt;
      }
    } catch {}
  }
}