import React, { useState } from "react";
import {useLanguage} from "../Context/LanguageContext";
import useCareTeam from "../Hooks/UseCareTeam.ts";

const CareTeamPage: React.FC = () => {
    const { lang } = useLanguage();
    const { team, addMember, deleteMember } = useCareTeam();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState<"Doctor" | "Caregiver" | "Companion">("Doctor");
    const [phoneError, setPhoneError] = useState("");

    const handleAdd = () => {
        const phoneRegex = /^\+?\d+$/;

        if (phone !== "" && !phoneRegex.test(phone)) {
            setPhoneError(lang === "sv" ? "Fel format (skriv siffror)" : "صيغة خاطئة (اكتب أرقام)");
            return;
        }

        if (!name.trim() || !phone.trim()) return;
        addMember(name, phone, role);
        setName("");
        setPhone("");
        setRole("Doctor");
    };

    const getRoleIcon = (role: string) => {
        switch (role) {
            case "Doctor": return "👨‍⚕️";
            case "Caregiver": return "🏠";
            case "Companion": return "🤝";
            default: return "🩺";
        }
    };

    return (
        <section className="flex flex-col gap-6 p-2 animate-in fade-in duration-500">
            <header>
                <h1 className="text-2xl font-black text-white italic uppercase tracking-tighter">
                    {lang === "sv" ? "Vårdteam" : "فريق الرعاية"}
                </h1>
            </header>

            <div
                className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl shadow-2xl space-y-4">


                <input
                    type="text"
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder:text-white/20 focus:border-blue-500 outline-none transition-all"
                    placeholder={lang === "sv" ? "Namn" : "الاسم"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <select
                    value={role}

                    onChange={(e) => setRole(e.target.value as "Doctor" | "Caregiver" | "Companion")}

                    className="w-full rounded-xl border border-white/10 bg-[#1a1b23] p-3 text-white outline-none focus:border-blue-500"
                >
                    <option value="Doctor">
                        {lang === "sv" ? "Läkare" : "طبيب"}
                    </option>
                    <option value="Caregiver">
                        {lang === "sv" ? "Vårdare" : "مقدم رعاية"}
                    </option>
                    <option value="Companion">
                        {lang === "sv" ? "Ledsagare" : "مرافق"}
                    </option>
                </select>


                <div className="space-y-1">
                    <input
                        type="tel"
                        className={`w-full rounded-xl border p-3 transition-all outline-none bg-white/5 text-white ${
                            phoneError ? "border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]" : "border-white/10 focus:border-blue-500"
                        }`}
                        placeholder={lang === "sv" ? "Telefonnummer" : "رقم الهاتف"}
                        value={phone}
                        onChange={(e) => {
                            setPhone(e.target.value);
                            if (phoneError) setPhoneError("");
                        }}
                    />
                    {phoneError && (
                        <p className="text-red-500 text-[10px] font-black uppercase italic ml-2 animate-pulse">
                             {phoneError}
                        </p>
                    )}
                </div>


                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => {
                            setName("");
                            setPhone("");
                            setPhoneError("");
                        }}
                        className="rounded-xl bg-white/5 py-4 text-[10px] font-black text-white/40 hover:bg-white/10 transition-all uppercase"
                    >
                        {lang === "sv" ? "Avbryt" : "إلغاء"}
                    </button>
                    <button
                        onClick={handleAdd}
                        className="rounded-xl bg-blue-600 py-4 text-[10px] font-black text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all active:scale-95 uppercase"
                    >
                        {lang === "sv" ? "Spara" : "حفظ"}
                    </button>
                </div>
            </div>


            <div className="space-y-3 pb-20">
                {team.length === 0 ? (
                    <p className="text-white/20 text-xs text-center py-10 italic">
                        {lang === "sv" ? "Inga kontakter än" : "لا توجد جهات اتصال بعد"}
                    </p>
                ) : (
                    team.map(member => (
                        <div key={member.id}
                             className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur-md hover:bg-white/10 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-lg shadow-inner">
                                    {getRoleIcon(member.role)}
                                </div>
                                <div>
                                    <div className="font-bold text-white text-sm">{member.name}</div>
                                    <div className="text-[9px] text-blue-400 font-black uppercase tracking-tighter opacity-80">
                                        {member.role}
                                    </div>
                                    <div className="text-[11px] text-white/40 font-mono">{member.phone}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <a href={`tel:${member.phone}`} className="p-2.5 bg-green-500/20 text-green-400 rounded-full hover:bg-green-500 hover:text-white transition-all">
                                    📞
                                </a>
                                <button
                                    onClick={() => deleteMember(member.id)}
                                    className="p-2.5 text-red-400/50 hover:text-red-400 transition-all"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default CareTeamPage;