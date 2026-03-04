import React from "react";
import { useLanguage } from "../Context/LanguageContext";

interface Props {
    text: string;
}

const SpeechButton: React.FC<Props> = ({ text }) => {
    const { lang, t } = useLanguage();
    const [speaking, setSpeaking] = React.useState<boolean>(false);

    const stop = React.useCallback(() => {
        window.speechSynthesis.cancel();
        setSpeaking(false);
    }, []);

    const speak = React.useCallback(() => {
        if (!text || text.trim() === "") return;
        stop();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = lang === "ar" ? "ar-SA" : "sv-SE";
        u.rate = 0.9;
        u.onend = () => setSpeaking(false);
        u.onerror = () => setSpeaking(false);

        setSpeaking(true);
        window.speechSynthesis.speak(u);
    }, [lang, stop, text]);

    React.useEffect(() => {
        return () => stop();
    }, [stop]);

    return (
        <button
            type="button"
            className={`flex items-center gap-3 rounded-2xl px-5 py-3 text-sm font-bold transition-all shadow-lg active:scale-95 ${
                speaking
                    ? "bg-red-500 text-white animate-pulse"
                    : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
            }`}
            onClick={speaking ? stop : speak}
        >
            <span className="text-xl">{speaking ? "⏹" : "🔊"}</span>
            <span className="tracking-wide">
                {speaking ? t("stopReading") : t("readAloud")}
            </span>
        </button>
    );
};

export default SpeechButton;