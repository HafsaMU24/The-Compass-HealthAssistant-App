import React from "react";
import { useLanguage } from "../Context/LanguageContext";

const LanguageButton: React.FC = () => {
    const { lang, setLang, t } = useLanguage();

    return (
        <button
            type="button"
            aria-label={t("language")}
            className="rounded-xl border px-3 py-2 text-sm hover:bg-black/5"
            onClick={() => setLang(lang === "sv" ? "ar" : "sv")}
        >
            {lang === "sv" ? "العربية" : "Svenska"}
        </button>
    );
};

export default LanguageButton;
