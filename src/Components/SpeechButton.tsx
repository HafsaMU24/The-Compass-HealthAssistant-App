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
        stop();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = lang === "ar" ? "ar" : "sv-SE";
        u.onend = () => setSpeaking(false);
        u.onerror = () => setSpeaking(false);
        setSpeaking(true);
        window.speechSynthesis.speak(u);
    }, [lang, stop, text]);

    React.useEffect(() => stop, [stop]);

    return (
        <button
            type="button"
            className="rounded-xl border px-3 py-2 text-sm hover:bg-black/5"
            onClick={speaking ? stop : speak}
        >
            {speaking ? t("stopReading") : t("readAloud")}
        </button>
    );
};

export default SpeechButton;
