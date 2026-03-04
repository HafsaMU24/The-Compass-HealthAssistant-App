import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";

const HealthPage: React.FC = () => {
    const { lang } = useLanguage();

    return (
        <div className="space-y-6 p-2 text-right" dir="auto">
            <h1 className="text-3xl font-bold">{lang === "sv" ? "Min Hälsa" : "صحتي"}</h1>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <Link to="/health/medications" className="flex flex-col items-center justify-center rounded-2xl border-2 border-blue-100 bg-blue-50 p-8 shadow-sm hover:bg-blue-100 transition-all">
                    <span className="text-5xl mb-3">💊</span>
                    <span className="text-xl font-bold text-blue-800">{lang === "sv" ? "Mina Mediciner" : "أدويتي"}</span>
                </Link>

                <Link to="/health/care-team" className="flex flex-col items-center justify-center rounded-2xl border-2 border-emerald-100 bg-emerald-50 p-8 shadow-sm hover:bg-emerald-100 transition-all">
                    <span className="text-5xl mb-3">🩺</span>
                    <span className="text-xl font-bold text-emerald-800">{lang === "sv" ? "Vårdteam" : "فريق الرعاية"}</span>
                </Link>
            </div>

            <div className="mt-10 border-t pt-6">
                <h2 className="text-lg font-bold mb-4">{lang === "sv" ? "Hälsoinformation" : "معلومات صحية"}</h2>
                
            </div>
        </div>
    );
};

export default HealthPage;