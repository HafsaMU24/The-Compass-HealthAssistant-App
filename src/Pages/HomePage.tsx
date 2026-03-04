import React, { useState } from "react";
import { useLanguage } from "../Context/LanguageContext";

const HomePage: React.FC = () => {
    const { t, lang } = useLanguage();
    const [showAbout, setShowAbout] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center h-full w-full text-center p-6 gap-8 select-none animate-in fade-in duration-700">

            <div className="relative group">
                <div className="absolute inset-0 bg-fuchsia-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="relative flex items-center justify-center w-32 h-32 rounded-full bg-linear-to-br from-white/10 to-white/5 border-2 border-white/10 text-fuchsia-300 shadow-2xl backdrop-blur-sm transition-transform duration-500 group-hover:scale-105">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.2"
                        stroke="currentColor"
                        className="w-16 h-16"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11.25V15m0 0H9m3 0h3" />
                    </svg>
                </div>
            </div>

            <div className="space-y-4 relative z-10">
                <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl bg-linear-to-r from-white to-blue-200 bg-clip-text text-transparent italic">
                    {t("appName")}
                </h1>
                <p className="mx-auto max-w-sm text-lg text-blue-100/70 font-medium leading-relaxed">
                    {t("healthInfoDesc")}
                </p>
            </div>

            <div className="w-20 h-1 bg-linear-to-r from-transparent via-fuchsia-500 to-transparent rounded-full opacity-50" />

            <div className="w-full max-w-sm">
                <button
                    onClick={() => setShowAbout(!showAbout)}
                    className="flex items-center gap-2 mx-auto text-[10px] uppercase tracking-[0.2em] text-fuchsia-400/60 hover:text-fuchsia-300 transition-colors font-bold"
                >
                    <span className="text-sm">ⓘ</span>
                    {lang === "sv" ? "Om appen & Support" : "حول التطبيق والدعم"}
                </button>

                {showAbout && (
                    <div className="mt-6 p-6 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl text-left animate-in slide-in-from-bottom-4 duration-300 shadow-2xl">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-fuchsia-300 text-xs font-black uppercase tracking-wider mb-1">
                                    {lang === "sv" ? "Syfte" : "الهدف"}
                                </h3>
                                <p className="text-blue-100/60 text-xs leading-relaxed">
                                    {lang === "sv"
                                        ? "Denna applikation är skapad för att underlätta hanteringen av din hälsa genom smarta verktyg och analyser."
                                        : "تم إنشاء هذا التطبيق لتسهيل إدارة صحتك من خلال أدوات وتحليلات ذكية."}
                                </p>
                            </div>

                            <div className="h-px bg-white/5 w-full" />

                            <div>
                                <h3 className="text-fuchsia-300 text-xs font-black uppercase tracking-wider mb-2">
                                    {lang === "sv" ? "Kontakt & Felrapportering" : "التواصل والإبلاغ عن خلل"}
                                </h3>
                                <div className="space-y-2">
                                    <a href="mailto:support@healthapp.com" className="flex items-center gap-3 text-white/50 hover:text-white transition-colors group">
                                        <div className="p-2 rounded-lg bg-white/5 group-hover:bg-fuchsia-500/20 transition-colors">📧</div>
                                        <span className="text-[10px] font-mono">support@healthapp.com</span>
                                    </a>
                                    <div className="flex items-center gap-3 text-white/50 group">
                                        <div className="p-2 rounded-lg bg-white/5">📞</div>
                                        <span className="text-[10px] font-mono">+46 70 000 00 00</span>
                                    </div>
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
            {/* --- SLUT PÅ NY SEKTION --- */}

        </div>
    );
};

export default HomePage;