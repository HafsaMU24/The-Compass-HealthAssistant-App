export type StorageKey = "lang" | "quizHistory" | "demoUsers" | "demoSession" | "userDefaults";

const StorageService = {
    get<T>(key: StorageKey): T | null {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : null;
    },

    set<T>(key: StorageKey, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    },

    remove(key: StorageKey): void {
        localStorage.removeItem(key);
    },
};

export default StorageService;
