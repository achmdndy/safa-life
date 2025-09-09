import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18nManager } from "react-native";
import i18n from "@/lib/i18n";
import Realm from "realm";
import { Translation } from "@/schemas/realms/translation";

export type Language = "id" | "en" | "ar" | "ms";

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => Promise<void>;
  isRTL: boolean;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("id");
  const [isRTL, setIsRTL] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeLanguage = async () => {
      setIsLoading(true);
      try {
        const savedLanguage = (await AsyncStorage.getItem("@app_language")) as Language | null;
        const languageToUse = savedLanguage ?? "id";

        await loadLanguage(languageToUse);
      } catch (err) {
        console.error("Error initializing language", err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeLanguage();
  }, []);

  const loadLanguage = async (language: Language) => {
    const realm = await Realm.open({ schema: [Translation] });

    if (language === "id") {
      await i18n.changeLanguage("id");
    } else {
      const ns = ["splash", "language"];
      let foundAll = true;

      for (const namespace of ns) {
        const entry = realm.objectForPrimaryKey<Translation>(
          "Translation",
          `${language}_${namespace}`
        );
        if (entry) {
          i18n.addResourceBundle(language, namespace, JSON.parse(entry.data), true, true);
        } else {
          foundAll = false;
        }
      }

      if (!foundAll) {
        // fetch from API
        for (const namespace of ns) {
          const res = await fetch(`https://your-api.com/locales/${language}/${namespace}.json`);
          const data = await res.json();

          // save to realm
          realm.write(() => {
            realm.create(
              "Translation",
              {
                _id: `${language}_${namespace}`,
                language,
                namespace,
                data: JSON.stringify(data),
              },
              Realm.UpdateMode.Modified,
            );
          });

          i18n.addResourceBundle(language, namespace, data, true, true);
        }
      }

      await i18n.changeLanguage(language);
    }

    setCurrentLanguage(language);
    const newIsRTL = language === "ar";
    setIsRTL(newIsRTL);
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(newIsRTL);

    await AsyncStorage.setItem("@app_language", language);
    realm.close();
  };

  const setLanguage = async (language: Language) => {
    setIsLoading(true);
    try {
      await loadLanguage(language);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, isRTL, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
