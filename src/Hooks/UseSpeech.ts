import { useState, useCallback, useEffect } from "react";
import {useLanguage} from "../Context/LanguageContext.tsx";


export const useSpeech = (text: string) => {
    const { lang } = useLanguage();
    const [speaking, setSpeaking] = useState<boolean>(false);

    const stop = useCallback(() => {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            setSpeaking(false);
        }
    }, []);

    const speak = useCallback(() => {
        if (!text || text.trim() === "") return;

        stop();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang === "ar" ? "ar-SA" : "sv-SE";
        utterance.rate = 0.9;

        utterance.onstart = () => setSpeaking(true);
        utterance.onend = () => setSpeaking(false);
        utterance.onerror = () => setSpeaking(false);

        window.speechSynthesis.speak(utterance);
    }, [lang, stop, text]);


    useEffect(() => {
        return () => stop();
    }, [stop]);

    return { speak, stop, speaking };
};