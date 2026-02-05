import React from "react";
import type { HealthTopic } from "../Types/Domain";
import { useLanguage } from "../Context/LanguageContext";
import SpeechButton from "./SpeechButton";

interface Props {
    topic: HealthTopic;
}

const PageRenderer: React.FC<Props> = ({ topic }) => {
    const { lang } = useLanguage();

    const ttsText = [
        topic.title[lang],
        topic.description[lang],
        ...topic.sections.flatMap((s) => [s.title[lang], s.body[lang]]),
    ].join(". ");

    return (
        <article className="space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                    <h1 className="text-2xl font-semibold">{topic.title[lang]}</h1>
                    <p className="mt-1 text-sm text-black/70">{topic.description[lang]}</p>
                </div>
                <SpeechButton text={ttsText} />
            </div>

            <div className="space-y-3">
                {topic.sections.map((s, idx) => (
                    <section key={idx} className="rounded-2xl border p-4">
                        <h2 className="text-lg font-semibold">{s.title[lang]}</h2>
                        <p className="mt-2 text-sm leading-6 text-black/80">{s.body[lang]}</p>
                    </section>
                ))}
            </div>
        </article>
    );
};

export default PageRenderer;
