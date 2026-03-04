import React from "react";
import { useLanguage } from "../Context/LanguageContext";

interface Props {
    text: string;
}

const SpeechButton: React.FC<Props> = ({ text }) => {
    const langContext = useLanguage();
    const { lang, t } = langContext;

    const [speaking, setSpeaking] = React.useState<boolean>(false);

    const stop = React.useCallback(() => {
        window.speechSynthesis.cancel();
        setSpeaking(false);
    }, []);

    const speak = React.useCallback(() => {
        if (!text || text.trim() === "") {
            console.warn("SpeechButton: No text provided to speak.");
            return;
        }
        stop();
        const u = new SpeechSynthesisUtterance(text);

        u.lang = lang === "ar" ? "ar-SA" : "sv-SE";
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

            className={`flex items-center gap-2 rounded-xl border-2 px-4 py-2 text-sm font-bold transition-all shadow-sm ${
                speaking
                    ? "bg-red-50 border-red-500 text-red-700"
                    : "bg-blue-50 border-blue-500 text-blue-700 hover:bg-blue-100"
            }`}
            onClick={speaking ? stop : speak}
        >
            <span className="text-lg">{speaking ? "⏹" : "🔊"}</span>
            <span>
                {speaking ? t("stopReading") : t("readAloud")}
            </span>
        </button>
    );
};

export default SpeechButton;