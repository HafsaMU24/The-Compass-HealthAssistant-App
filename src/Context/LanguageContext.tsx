import React, { useState, useEffect, createContext, useContext, useMemo, useCallback } from "react";
import type { ReactNode } from "react";
import type { Lang, Direction, I18nDict, I18nKey } from "../Types/I18n";
import { SettingsService } from "../Services/SettingsService";
import { useUser } from "@clerk/clerk-react";

const dict: I18nDict = {
    sv: {
        appName: "The Compass",
        home: "Hem",
        health: "Hälsa",
        assessment: "Symptomkontroll",
        login: "Logga in",
        logout: "Logga ut",
        startQuiz: "StartQuiz",
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
    isSignedIn: boolean;
    isAuthLoaded: boolean;
};

const LanguageContext = createContext<LanguageState | null>(null);

const dirOf = (l: Lang): Direction => (l === "ar" ? "rtl" : "ltr");

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [lang, setLangState] = useState<Lang>(() => SettingsService.get().language ?? "sv");
    const dir = dirOf(lang);
    const { isSignedIn, isLoaded } = useUser();

    useEffect(() => {
        document.documentElement.dir = dir;
        document.documentElement.lang = lang;
    }, [dir, lang]);

    const setLang = useCallback((l: Lang) => {
        SettingsService.setLanguage(l);
        setLangState(l);
    }, []);

    const t = useCallback((key: I18nKey): string => {
        return dict[lang]?.[key] || key;
    }, [lang]);

    const value = useMemo(() => ({
        lang,
        dir,
        t,
        setLang,
        isSignedIn: !!isSignedIn,
        isAuthLoaded: isLoaded
    }), [lang, dir, t, setLang, isSignedIn, isLoaded]);

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageState => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};


