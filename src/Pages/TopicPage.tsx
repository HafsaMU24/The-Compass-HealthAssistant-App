import React from "react";
import { useParams } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";

const TopicPage: React.FC = () => {
    const { slug } = useParams();
    const { lang } = useLanguage();

    const isMedication = slug === "medications";

    return (
        <div className="flex flex-col gap-6 p-2 text-left animate-in fade-in duration-500">
            <h2 className="text-2xl font-black text-white">
                {isMedication
                    ? (lang === "sv" ? "Lägg till Medicin" : "إضافة دواء جديد")
                    : (lang === "sv" ? "Vårdkontakt" : "إضافة جهة رعاية")
                }
            </h2>

            <div className="space-y-4 bg-white/5 p-5 rounded-[2rem] border border-white/10 shadow-inner">
                <div className="space-y-1">
                    <label className="text-xs font-bold text-blue-400 px-1 uppercase tracking-tighter">
                        {isMedication ? (lang === "sv" ? "Namn på medicin" : "اسم الدواء") : (lang === "sv" ? "Läkarens namn" : "اسم الطبيب")}
                    </label>
                    <input
                        type="text"
                        className="w-full bg-white/10 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none transition-all placeholder:text-slate-500"
                        placeholder="..."
                    />
                </div>


                <div className="space-y-1">
                    <label className="text-xs font-bold text-blue-400 px-1 uppercase tracking-tighter">
                        {isMedication ? (lang === "sv" ? "Dosering" : "الجرعة") : (lang === "sv" ? "Telefonnummer" : "رقم الهاتف")}
                    </label>
                    <input
                        type={isMedication ? "text" : "tel"}
                        className="w-full bg-white/10 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none transition-all"
                        placeholder="..."
                    />
                </div>

                <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl shadow-lg shadow-blue-900/40 transition-all active:scale-95 mt-4">
                    {lang === "sv" ? "Spara" : "حفظ البيانات"}
                </button>
            </div>
        </div>
    );
};

export default TopicPage;