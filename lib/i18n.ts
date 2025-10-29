import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import idTabs from "@/locales/id/tabs.json";
import idSplash from "@/locales/id/splash.json";
import idOnboarding from "@/locales/id/onboarding.json";
import idLanguage from "@/locales/id/language.json";
import idHome from "@/locales/id/home.json";
import idQuran from "@/locales/id/quran.json";
import idExplore from "@/locales/id/explore.json";
import idLogin from "@/locales/id/login.json";
import idRegister from "@/locales/id/register.json";
import idForgotPassword from "@/locales/id/forgot-password.json";
import idTwoFa from "@/locales/id/2fa.json";
import idVerifyEmail from "@/locales/id/verify-email.json";
import idCharity from "@/locales/id/charity.json";
import idProfile from "@/locales/id/profile.json";
import idNotifications from "@/locales/id/notifications.json";
import idArticles from "@/locales/id/articles.json";
import enTabs from "@/locales/en/tabs.json";
import enSplash from "@/locales/en/splash.json";
import enOnboarding from "@/locales/en/onboarding.json";
import enLanguage from "@/locales/en/language.json";
import enHome from "@/locales/en/home.json";
import enQuran from "@/locales/en/quran.json";
import enExplore from "@/locales/en/explore.json";
import enLogin from "@/locales/en/login.json";
import enRegister from "@/locales/en/register.json";
import enForgotPassword from "@/locales/en/forgot-password.json";
import enTwoFa from "@/locales/en/2fa.json";
import enVerifyEmail from "@/locales/en/verify-email.json";
import enCharity from "@/locales/en/charity.json";
import enProfile from "@/locales/en/profile.json";
import enNotifications from "@/locales/en/notifications.json";
import enArticles from "@/locales/en/articles.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      id: {
        tabs: idTabs,
        splash: idSplash,
        onboarding: idOnboarding,
        language: idLanguage,
        login: idLogin,
        register: idRegister,
        forgotPassword: idForgotPassword,
        twoFa: idTwoFa,
        verifyEmail: idVerifyEmail,
        home: idHome,
        quran: idQuran,
        explore: idExplore,
        charity: idCharity,
        profile: idProfile,
        notifications: idNotifications,
        articles: idArticles,
      },
      en: {
        tabs: enTabs,
        splash: enSplash,
        onboarding: enOnboarding,
        language: enLanguage,
        login: enLogin,
        register: enRegister,
        forgotPassword: enForgotPassword,
        twoFa: enTwoFa,
        verifyEmail: enVerifyEmail,
        home: enHome,
        quran: enQuran,
        explore: enExplore,
        charity: enCharity,
        profile: enProfile,
        notifications: enNotifications,
        articles: enArticles,
      },
    },
    lng: "id",
    fallbackLng: "id",
    ns: ["tabs", "splash", "onboarding", "language", "login", "register", "forgotPassword", "twoFa", "verifyEmail", "home", "quran", "explore", "charity", "profile", "notifications", "articles"],
    defaultNS: "splash",
    interpolation: { escapeValue: false },
  });

export default i18n;