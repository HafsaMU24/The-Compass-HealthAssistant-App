import React from "react";
import { useNavigate} from "react-router-dom";
import {useLanguage} from "../Context/LanguageContext";

const HealthPage: React.FC = () => {
    const { lang } = useLanguage();
    const navigate = useNavigate();

    const cardStyle = "flex flex-col items-center justify-center gap-4 rounded-[2.5rem] p-6 backdrop-blur-md border border-white/10 shadow-lg transition-all hover:bg-white/5";

    return (
        <div className="flex flex-col gap-6 p-4 animate-in fade-in">
            <h1 className="text-2xl font-black text-white italic uppercase">{lang === 'sv' ? "Hälsa" : "الصحة"}</h1>

            <div className="grid grid-cols-2 gap-4">
                <div onClick={() => navigate("/health/medication")} className={`${cardStyle} bg-red-500/20`}>
                    <span className="text-4xl">💊</span>
                    <span className="text-[10px] font-bold text-white uppercase">{lang === 'sv' ? "Mediciner" : "الأدوية"}</span>
                </div>
                <div onClick={() => navigate("/health/care-team")} className={`${cardStyle} bg-emerald-500/20`}>
                    <span className="text-4xl">🩺</span>
                    <span className="text-[10px] font-bold text-white uppercase">{lang === 'sv' ? "Vårdteam" : "فريق الرعاية"}</span>
                </div>
                <div onClick={() => navigate("/health/kids")} className={`${cardStyle} bg-amber-400/20`}>
                    <span className="text-4xl">👶</span>
                    <span className="text-[10px] font-bold text-white uppercase">{lang === 'sv' ? "Barn" : "الأطفال"}</span>
                </div>
                <div onClick={() => navigate("/health/pregnancy")} className={`${cardStyle} bg-pink-500/20`}>
                    <span className="text-4xl">🤰</span>
                    <span className="text-[10px] font-bold text-white uppercase">{lang === 'sv' ? "Gravid" : "الحوامل"}</span>
                </div>
            </div>
        </div>
    );
};

export default HealthPage;