import Realm from "realm";

export class QuranSurah extends Realm.Object<QuranSurah> {
  number!: number; // 1..114
  id?: string;
  nameArabic?: string;
  nameEnglish?: string;
  revelationPlace?: string;
  ayahCount?: number;
  updatedAt?: string;
  createdAt?: string;

  static schema: Realm.ObjectSchema = {
    name: "QuranSurah",
    primaryKey: "number",
    properties: {
      number: "int",
      id: "string?",
      nameArabic: "string?",
      nameEnglish: "string?",
      revelationPlace: "string?",
      ayahCount: { type: "int", optional: true },
      updatedAt: "string?",
      createdAt: "string?",
    },
  };
}