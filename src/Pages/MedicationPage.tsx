import React, { useState } from "react";
import {useLanguage} from "../Context/LanguageContext";
import useMedication from "../Hooks/UseMedication.ts";


const MedicationPage: React.FC = () => {
    const { lang } = useLanguage();
    const { meds, addMedication, deleteMedication } = useMedication();
    const [form, setForm] = useState({ name: "", dosage: "", time: "" });
    const [error, setError] = useState("");

    const handleCancel = () => {
        setForm({ name: "", dosage: "", time: "" });
        setError("");

    };

    const handleSave = () => {
        const dosageRegex = /^\d+\s*[a-zA-Z]*$/;
        const isValid = dosageRegex.test(form.dosage);

        if (form.dosage !== "" && !isValid) {
            setError(lang === "sv" ? "Dosage måste vara siffror och m/M, g/G mg/MG eller m/M " : " الجرعة يجب أن تكون أرقاماً او ارقام و حجم الجرعة");
            return;

        }

        if (!form.name.trim()) return;
           addMedication(form.name, form.dosage, form.time);
           handleCancel();

       };

    return (

        <section className="flex flex-col gap-6 p-2 animate-in fade-in">
            <header>
                <h1 className="text-2xl font-black text-white italic uppercase tracking-tighter">
                    {lang === "sv" ? "Mina Mediciner" : "أدويتي"}
                </h1>
            </header>

            <div className="bg-white/10 p-6 rounded-[2rem] border border-white/10 space-y-4 backdrop-blur-md">
                <input
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-blue-500 transition-all"
                    placeholder={lang === "sv" ? "Namn" : "الاسم"}
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}

                />

                <div className="space-y-1">
                    <input
                        className={`w-full p-4 rounded-xl bg-white/5 border ${error ? 'border-red-500' : 'border-white/10'} text-white outline-none focus:border-blue-500 transition-all`}
                        placeholder={lang === "sv" ? "Dosage" : "الجرعة"}
                        value={form.dosage}
                        onChange={e => {
                            setForm({...form, dosage: e.target.value});
                            if (error) setError("");
                        }}
                    />
                    {error && <p className="text-red-500 text-[10px] font-bold px-2 animate-pulse">{error}</p>}

                </div>

                <input
                    type="time"
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
                    value={form.time}
                    onChange={e => setForm({...form, time: e.target.value})}

                />

                <div className="grid grid-cols-2 gap-3 pt-2">
                    <button onClick={handleCancel} className="bg-white/5 py-4 rounded-xl text-white/40 font-black text-xs uppercase hover:bg-white/10 transition-all">
                        {lang === "sv" ? "Avbryt" : "إلغاء"}
                    </button>

                    <button onClick={handleSave} className="bg-blue-600 py-4 rounded-xl text-white font-black text-xs uppercase shadow-lg shadow-blue-600/20 active:scale-95 transition-all">
                        {lang === "sv" ? "Spara" : "حفظ"}
                    </button>

                </div>

            </div>


            <div className="space-y-3">
                {(meds || []).map(med => (
                    <div key={med.id} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center text-lg">💊</div>

                            <div>
                                <div className="text-white font-bold">{med.name}</div>
                                <div className="text-[10px] text-white/40 uppercase font-black tracking-widest">
                                    {med.dosage} mg {med.time && `• ${med.time}`}
                                </div>

                            </div>

                        </div>

                        <button onClick={() => deleteMedication(med.id)} className="text-red-400 text-[10px] font-black uppercase px-3 py-2 hover:bg-red-500/10 rounded-lg transition-all">
                            {lang === "sv" ? "Radera" : "حذف"}

                        </button>

                    </div>

                ))}

            </div>

        </section>
    );

};


export default MedicationPage;