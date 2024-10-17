/* eslint-disable @typescript-eslint/no-explicit-any */
// i18n.js
import i18n from "i18next";
import Backend from "i18next-http-backend"; // For loading translations via HTTP
import { initReactI18next } from "react-i18next";

// Initialize i18next
i18n
  .use(Backend) // Load translations via HTTP
  .use(initReactI18next) // Bind react-i18next to the i18next instance
  .init({
    fallbackLng: "en", // Fallback language
    lng: "en", // Default language
    interpolation: {
      escapeValue: false, // React already escapes values, so we don't need this
    },
    backend: {
      // Define the path to your translation files dynamically
      loadPath: (lngs : any) => {
        // Use environment variables or default to a path
        return `locals/${lngs[0]}/translation.json`;
      },
    },
  });

// Access the current language
// const currentLanguage = i18n.language;

export default i18n;
