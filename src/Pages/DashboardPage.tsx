import { useState } from "react";
import {useLanguage} from "../Context/LanguageContext";

function DashboardPage () {
    const { t, lang } = useLanguage();
    const [showAbout, setShowAbout] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center h-full w-full text-center p-2 gap-8 select-none animate-in fade-in duration-700">

            <div className="relative group">
                <div className="absolute inset-0 bg-red-500 rounded-full blur-3xl opacity-20 transition-opacity duration-500" />

                <div className="relative flex items-center justify-center w-36 h-36 rounded-full bg-white/5 border-2 border-white/15 shadow-2xl backdrop-blur-md transition-transform duration-500 hover:scale-105">

                    <div className="w-20 h-20 bg-whit/10 rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-red-500/40">
                        <span className="text-5xl">H</span>
                    </div>
                </div>
            </div>

            {/* app rubrik */}
            <div className="space-y-4 relative z-10">
                <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent italic">
                    {t("appName")}
                </h1>
                <p className="mx-auto max-w-sm text-lg text-blue-100/70 font-medium leading-relaxed">
                    {t("healthInfoDesc")}
                </p>
            </div>


            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full opacity-50" />


            <div className="w-full max-w-sm">
                <button
                    onClick={() => setShowAbout(!showAbout)}
                    className="flex items-center gap-2 mx-auto text-[10px] uppercase tracking-[0.2em] text-red-400/60 hover:text-red-300 transition-colors font-bold"
                >
                    <span className="text-sm">ⓘ</span>
                    {lang === "sv" ? "Om appen & Support" : "حول التطبيق والدعم"}
                </button>

                {showAbout && (
                    <div className="mt-6 p-6 rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-2xl text-left animate-in slide-in-from-bottom-4 duration-300 shadow-2xl">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-red-400 text-xs font-black uppercase tracking-wider mb-1">
                                    {lang === "sv" ? "Syfte" : "الهدف"}
                                </h3>
                                <p className="text-blue-100/60 text-xs leading-relaxed">
                                    {lang === "sv"
                                        ? "Denna app har skapats för att underlätta din hälsohantering genom smarta verktyg, noggrann dataanalys och smidig tillgång till dina medicinska uppgifter på ett enkelt sätt ."
                                        : "تم إنشاء هذا التطبيق لتسهيل إدارة صحتك من خلال أدوات ذكية وتحليل دقيق للبيانات والتوصل لبياناتك الطبية بطريقة سلسة و سهلة."}
                                </p>
                            </div>

                            <div className="h-px bg-white/5 w-full" />

                            <div>
                                <h3 className="text-red-400 text-xs font-black uppercase tracking-wider mb-2">
                                    {lang === "sv" ? "Kontakt" : "التواصل"}
                                </h3>
                                <div className="space-y-2">
                                    <a href="mailto:support@healthapp.com" className="flex items-center gap-3 text-white/50 hover:text-white transition-colors group">
                                        <div className="p-2 rounded-lg bg-white/5 group-hover:bg-red-500/20">📧</div>
                                        <span className="text-[10px] font-mono tracking-tighter">support@healthapp.com</span>
                                    </a>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowAbout(false)}
                                className="w-full mt-2 py-2 text-[9px] font-black uppercase text-white/20 hover:text-red-400 transition-colors"
                            >
                                {lang === "sv" ? "Stäng" : "إغلاق"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;