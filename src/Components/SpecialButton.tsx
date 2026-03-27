import React from "react";
import { useLanguage } from "../Context/LanguageContext";
import { useSpeech } from "../Hooks/UseSpeech";

interface Props {
    text: string;
}

const SpeechButton: React.FC<Props> = ({ text }) => {
    const { t } = useLanguage();
    const { speak, stop, speaking } = useSpeech(text);

    return (
        <button
            type="button"
            onClick={speaking ? stop : speak}
            className={`flex items-center gap-3 rounded-2xl px-5 py-3 text-sm font-bold transition-all shadow-lg active:scale-95 ${
                speaking
                    ? "bg-red-500 text-white animate-pulse"
                    : "bg-blue-600 text-white hover:bg-blue-700 border border-white/20"
            }`}
        >
            <span className="text-xl">{speaking ? "⏹" : "🔊"}</span>
            <span className="tracking-wide">
                {speaking ? t("stopReading") : t("readAloud")}
            </span>
        </button>
    );
};

export default SpeechButton;