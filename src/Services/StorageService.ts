export type StorageKey =
    | "lang"
    | "quizHistory"
    | "demoUsers"
    | "demoSession"
    | "userDefaults"
    | "medication"
    | "careTeam"
    | "kidEvents"
    | "pregnancyEvent";

const StorageService = {
    get<T>(key: StorageKey): T | null {
        try {
            const raw = localStorage.getItem(key);
            return raw ? (JSON.parse(raw) as T) : null;
        } catch (e) {
            console.error(`Error reading ${key} from storage:`, e);
            return null;
        }
    },

    set<T>(key: StorageKey, value: T): void {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error(`Error saving ${key} to storage:`, e);
        }
    },

    remove(key: StorageKey): void {
        localStorage.removeItem(key);
    }
};

export default StorageService;
