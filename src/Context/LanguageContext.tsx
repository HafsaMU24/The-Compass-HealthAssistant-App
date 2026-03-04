import React from "react";
import type { Lang, Direction, I18nDict, I18nKey } from "../Types/I18n";
import { SettingsService } from "../Services/SettingsService";

const dict: I18nDict = {
    sv: {
        appName: "The Compass",
        home: "Hem",
        health: "Hälsa",
        assessment: "Testa symtom",
        login: "Logga in",
        logout: "Logga ut",
        startQuiz: "Starta quiz",
        readAloud: "Lyssna",
        stopReading: "Stoppa",
        language: "Språk",
        healthInfoDesc: "Välkommen till din hälso assistant.",
    },
    ar: {
        appName: "مساعد الصحة",
        home: "الرئيسية",
        health: "الصحة",
        assessment: "فحص الاعراض",
        login: "تسجيل الدخول",
        logout: "تسجيل الخروج",
        startQuiz: "ابدأ الاختبار",
        readAloud: "استمع",
        stopReading: "إيقاف",
        language: "اللغة",
        healthInfoDesc: "مرحبا بك في مساعدك الصحي",
    },
};

type LanguageState = {
    lang: Lang;
    dir: Direction;
    t: (key: I18nKey) => string;
    setLang: (l: Lang) => void;
};

const LanguageContext = React.createContext<LanguageState | null>(null);

const dirOf = (l: Lang): Direction => (l === "ar" ? "rtl" : "ltr");

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [lang, setLangState] = React.useState<Lang>(() => SettingsService.get().language ?? "sv");
    const dir = dirOf(lang);

    React.useEffect(() => {
        document.documentElement.dir = dir;
        document.documentElement.lang = lang;
    }, [dir, lang]);

    const setLang = (l: Lang) => {
        SettingsService.setLanguage(l);
        setLangState(l);
    };


    const t = (key: I18nKey) => {
        return dict[lang][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ lang, dir, t, setLang }}>
            {children}
        </LanguageContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
    const ctx = React.useContext(LanguageContext);


    if (!ctx) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }

    return ctx;
}