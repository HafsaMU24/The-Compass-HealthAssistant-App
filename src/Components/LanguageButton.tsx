import React from "react";
import {useLanguage} from "../Context/LanguageContext";

const LanguageButton: React.FC = () => {
    const { lang, setLang } = useLanguage();

    return (
        <button
            type="button"
            className="flex items-center gap-2 cursor-pointer bg-white/10 border border-white/20 px-3 py-1.5 rounded-full hover:bg-white/20 transition-all text-white font-medium shadow-sm"
            onClick={() => setLang(lang === "sv" ? "ar" : "sv")}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>

            <span className="text-sm">
                {lang === "sv" ? "AR" : "SV"}
            </span>
        </button>
    );
};

export default LanguageButton;