import type { Direction, Lang }  from "../Types/I18n";
import type { UserDefaults }  from "../Types/UserDefaults";
import StorageService from "./StorageService";

const SETTINGS_KEY = "userDefaults" as const;

export const SettingsService = {
    get(): UserDefaults {
        return StorageService.get<UserDefaults>(SETTINGS_KEY) ?? {};
    },

    set(next: UserDefaults): void {
        StorageService.set(SETTINGS_KEY, next);
    },

    setLanguage(language: Lang): void {
        const cur = SettingsService.get();
        SettingsService.set({ ...cur, language });
    },

    setDirection(direction: Direction): void {
        const cur = SettingsService.get();
        SettingsService.set({ ...cur, direction });
    },
};
