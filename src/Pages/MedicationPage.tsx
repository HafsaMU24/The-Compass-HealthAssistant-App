import React, { useState } from "react";
import { useLanguage } from "../Context/LanguageContext";

interface Medication {
    id: string;
    name: string;
    dosage: string;
    time: string;
}

const MedicationPage: React.FC = () => {
    const { lang } = useLanguage();
    const [meds, setMeds] = useState<Medication[]>([]);
    const [name, setName] = useState("");
    const [dosage, setDosage] = useState("");
    const [time, setTime] = useState("");
    const [error, setError] = useState("");

    const handleSave = () => {
        if (name.trim() === "") return;
        const newMed: Medication = {
            // eslint-disable-next-line react-hooks/purity
            id: Date.now().toString(),
            name,
            dosage:`${dosage} mg`,
            time
        };

        setMeds([...meds, newMed]);
        handleCancel();
    };

    const handleCancel = () => {
        setName("");
        setDosage("");
        setTime("");
        setError("");
    };

    const handleDelete = (id: string) => {
        setMeds(meds.filter(med => med.id !== id));
    };

    return (
        <section className="flex flex-col gap-6 p-2 animate-in fade-in duration-500">
            <header>
                <h1 className="text-2xl font-black text-white italic uppercase tracking-tighter">
                    {lang === "sv" ? "Mina Mediciner" : "أدويتي"}
                </h1>
            </header>

            <div className="rounded-[2rem] border border-white/10 bg-white/20 p-6 backdrop-blur-xl shadow-2xl">
                <div className="space-y-4">
                    <input
                        type="text"
                        className="w-full rounded-xl border border-white/10 bg-sky-50 p-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-all"
                        placeholder={lang === "sv" ? "Läkemedlets namn" : "اسم الدواء"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                        <input
                            type="text"
                            inputMode="decimal"
                            className={`w-full rounded-xl border border-white/10 bg-sky-50 p-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 $ {
                            error ? "border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]" : "border-white/10 focus:border-blue-500" }`}

                            placeholder={lang === "sv" ? "Dos (mg)" : "(ملغ)الجرعة"}
                            value={dosage}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (/^[0-9.]*$/.test(val)) {
                                    setDosage(val);
                                    setError("");
                                } else {
                                    setError(lang === "sv" ? "Använd endast siffror" : "يجب استخدام الأرقام فقط");
                                    setTimeout(() => setError(""), 2500);
                                }
                            }}
                        />
                            {error && (
                                <span className="text-[9px] text-red-400 font-bold px-2 animate-pulse uppercase tracking-wider">
                                    {error}
                                </span>
                            )}
                        </div>

                        <input
                            type="time"
                            className="w-full rounded-xl border border-white/10 bg-sky-50 p-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            onClick={handleCancel}
                            className="flex-1 rounded-xl bg-white/5 border border-white/10 py-3 text-sm font-bold text-white hover:bg-white/10 transition-all active:scale-95"
                        >
                            {lang === "sv" ? "Avbryt" : "إلغاء"}
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex-[2] rounded-xl bg-blue-600 py-3 text-sm font-bold text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all active:scale-95"
                        >
                            {lang === "sv" ? "Spara" : "حفظ"}
                        </button>
                    </div>
                </div>
            </div>


            <div className="space-y-3">
                <h2 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] px-2">
                    {lang === "sv" ? "Aktiva mediciner" : "الأدوية الحالية"}
                </h2>
                {meds.length === 0 ? (
                    <p className="text-white/30 text-xs text-center py-4 italic">
                        {lang === "sv" ? "Inga mediciner tillagda" : "لا توجد أدوية مضافة"}
                    </p>
                ) : (
                    meds.map(med => (
                        <div key={med.id} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur-md">
                            <div>
                                <div className="font-bold text-white">{med.name}</div>
                                <div className="text-xs text-white/50">{med.dosage} • {med.time}</div>
                            </div>
                            <button
                                onClick={() => handleDelete(med.id)}
                                className="text-red-400 text-xs font-bold hover:text-red-300 p-2"
                            >
                                {lang === "sv" ? "Ta bort" : "حذف"}
                            </button>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default MedicationPage;