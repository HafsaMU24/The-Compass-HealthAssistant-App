import type{ Lang } from "../Types/I18n";

const LANG_KEY = "user_language";

export const SettingsService = {
    get: () => {
        try {
            const language = localStorage.getItem(LANG_KEY) as Lang | null;
            return { language: language || "sv" };
        } catch (error) {
            console.error("[SettingsService] Failed to get language from localStorage:", error);
            return { language: "sv" as Lang };
        }
    },
    setLanguage: (lang: Lang) => {
        try {
            localStorage.setItem(LANG_KEY, lang);
        } catch (error) {
            console.error("[SettingsService] Failed to save language to localStorage:", error);
        }
    }
};