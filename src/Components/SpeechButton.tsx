import React, { useState, useCallback, useEffect } from "react";
import { useLanguage } from "../Context/LanguageContext";

interface Props {
    text: string;
}

const SpeechButton: React.FC<Props> = ({ text }) => {
    const { lang, t } = useLanguage();
    const [speaking, setSpeaking] = useState<boolean>(false);

    const stop = useCallback(() => {
        window.speechSynthesis.cancel();
        setSpeaking(false);
    }, []);

    const speak = useCallback(() => {
        if (!text || text.trim() === "") return;

        stop();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang === "ar" ? "ar-SA" : "sv-SE";
        utterance.rate = 0.9;

        utterance.onstart = () => setSpeaking(true);
        utterance.onend = () => setSpeaking(false);
        utterance.onerror = (event) => {
            console.error("Speech Synthesis Error:", event);
            setSpeaking(false);
        };

        window.speechSynthesis.speak(utterance);
    }, [lang, stop, text]);


    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    return (
        <button
            type="button"
            onClick={speaking ? stop : speak}
            className={`flex items-center gap-3 rounded-2xl px-5 py-3 text-sm font-bold transition-all shadow-lg active:scale-95 z-50 ${
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