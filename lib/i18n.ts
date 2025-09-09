import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import idSplash from "@/locales/id/splash.json";
import idLanguage from "@/locales/id/language.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      id: {
        splash: idSplash,
        language: idLanguage,
      },
    },
    lng: "id",
    fallbackLng: "id",
    ns: ["splash", "language"],
    defaultNS: "splash",
    interpolation: { escapeValue: false },
  });

export default i18n;