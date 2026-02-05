import React from "react";
import { useLanguage } from "../Context/LanguageContext";

const SpecialButton: React.FC = () => {
    const { lang } = useLanguage();

    return (
        <div className="flex gap-2">
            <a className="rounded-xl bg-black px-3 py-2 text-sm text-white" href="tel:112">
                {lang === "sv" ? "Ring 112" : "اتصل 112"}
            </a>
            <a className="rounded-xl border px-3 py-2 text-sm" href="tel:1177">
                {lang === "sv" ? "Ring 1177" : "اتصل 1177"}
            </a>
        </div>
    );
};

export default SpecialButton;
