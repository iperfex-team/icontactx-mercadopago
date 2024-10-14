import i18n from "i18next";
import { z } from "zod";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { zodI18nMap } from "zod-i18n-map";
// Import your language translation files
import en from "@/lang/en.json";
import es from "@/lang/es.json";
import pt from "@/lang/pt.json";
// Import your zod translation files
import zodEsTranslations from "zod-i18n-map/locales/es/zod.json";
import zodEnTranslations from "zod-i18n-map/locales/en/zod.json";
import zodPtTranslations from "zod-i18n-map/locales/pt/zod.json";

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        // lng: "en",
        fallbackLng: "en",
        resources: {
            en: {
                ...en,
                zod: zodEnTranslations,
            },
            es: {
                ...es,
                zod: zodEsTranslations,
            },
            pt: {
                ...pt,
                zod: zodPtTranslations,
            },
        },
        interpolation: {
            escapeValue: false,
        },
    });
z.setErrorMap(zodI18nMap);
