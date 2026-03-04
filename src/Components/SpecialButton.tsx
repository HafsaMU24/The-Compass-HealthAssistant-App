import React from "react";
import { useLanguage } from "../Context/LanguageContext";

const SpecialButton: React.FC = () => {

    const { lang } = useLanguage();

    return (
        <div className="grid grid-cols-2 gap-2 w-full">
            <a
                className="flex items-center justify-center rounded-xl bg-red-600 py-4 text-lg font-black text-white shadow-lg active:scale-95 transition-all hover:bg-red-700"
                href="tel:112"
            >

                {lang === "sv" ? "RING 112" : "اتصل ١١٢"}
            </a>
            <a
                className="flex items-center justify-center rounded-xl bg-blue-600 py-4 text-lg font-black text-white shadow-lg active:scale-95 transition-all hover:bg-blue-600"
                href="tel:1177"
            >
                {lang === "sv" ? "RING 1177" : "اتصل ١١٧٧"}
            </a>
        </div>
    );
};

export default SpecialButton;