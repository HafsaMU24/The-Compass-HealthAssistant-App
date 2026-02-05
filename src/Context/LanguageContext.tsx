import React from "react";
import type { Lang, Direction, I18nDict, I18nKey } from "../Types/I18n";
import { SettingsService } from "../Services/SettingsService";

const dict: I18nDict = {
    sv: {
        appName: "Hälsassistent",
        home: "Hem",
        health: "Hälsa",
        quiz: "Quiz",
        login: "Logga in",
        logout: "Logga ut",
        welcome: "Välkommen",
        startQuiz: "Starta quiz",
        readAloud: "Lyssna",
        stopReading: "Stoppa",
        language: "Språk",
        healthInfoTitle: "Hälsoinformation",
        healthInfoDesc: "Grundläggande information om vård och hälsa i Sverige.",
    },
    ar: {
        appName: "مساعد الصحة",
        home: "الرئيسية",
        health: "الصحة",
        quiz: "اختبار",
        login: "تسجيل الدخول",
        logout: "تسجيل الخروج",
        welcome: "مرحباً",
        startQuiz: "ابدأ الاختبار",
        readAloud: "استمع",
        stopReading: "إيقاف",
        language: "اللغة",
        healthInfoTitle: "معلومات صحية",
        healthInfoDesc: "معلومات أساسية حول الرعاية الصحية في السويد.",
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

    const t = (key: I18nKey) => dict[lang][key];

    return <LanguageContext.Provider value={{ lang, dir, t, setLang }}>{children}</LanguageContext.Provider>;
};

export function useLanguage() {
    const ctx = React.useContext(LanguageContext);
    if (!ctx) throw new Error("useLanguage måste användas inom LanguageProvider");
    return ctx;
}
