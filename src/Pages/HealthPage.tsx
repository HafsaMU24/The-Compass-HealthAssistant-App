import React from "react";
import { Link } from "react-router-dom";
import HEALTH_TOPICS  from "../Data/HealthTopics";
import { useLanguage }  from "../Context/LanguageContext";

const HealthPage: React.FC = () => {
    const { lang, t } = useLanguage();

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-2xl font-semibold">{t("healthInfoTitle")}</h1>
                <p className="mt-1 text-sm text-black/70">{t("healthInfoDesc")}</p>
            </div>

            <div className="grid gap-3">
                {HEALTH_TOPICS.map((topic) => (
                    <Link
                        key={topic.slug}
                        to={`/health/${topic.slug}`}
                        className="rounded-2xl border p-4 hover:bg-black/5"
                    >
                        <div className="text-lg font-semibold">{topic.title[lang]}</div>
                        <div className="mt-1 text-sm text-black/70">{topic.description[lang]}</div>
                        <div className="mt-3 text-xs font-semibold">
                            {lang === "sv" ? "Läs mer →" : "اقرأ المزيد →"}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HealthPage;
