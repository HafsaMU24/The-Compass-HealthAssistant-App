import React, { useState } from "react";
import {useLanguage} from "../Context/LanguageContext";
import usePregnancy from "../Hooks/UsePregnancy";
import type { PregnancyEvent } from "../Types/Domain";

const PregnancyPage: React.FC = () => {
    const { lang } = useLanguage();
    const { appointments, addAppointment, removeAppointment } = usePregnancy();

    const [form, setForm] = useState<Omit<PregnancyEvent, "id">>({
        date: "",
        time: "",
        location: "",
        contactPerson: "",
        reason: "",
        isCritical: false
    });

    const handleSave = () => {
        if (!form.date || !form.contactPerson || !form.reason || !form.location) return;
        addAppointment(form);
        setForm({ date: "", time: "", location: "", contactPerson: "", reason: "", isCritical: false });
    };

    const sendNotification = (event: PregnancyEvent) => {
        const message = lang === "sv"
            ? `Graviditetsbesök: ${event.reason} hos ${event.contactPerson} den ${event.date} kl ${event.time} på ${event.location}.`
            : `موعد حمل: ${event.reason} عند ${event.contactPerson} بتاريخ ${event.date} الساعة ${event.time} في ${event.location}.`;
        try {
            window.open(`sms:?body=${encodeURIComponent(message)}`, '_self');
        } catch (error) {
            console.error("Could not open SMS app", error);
        }
    };

    return (
        <section className="flex flex-col gap-6 p-2 animate-in fade-in duration-500">
            <header className="flex justify-between items-center">
                <h1 className="text-2xl font-black text-white italic uppercase tracking-tighter">
                    {lang === "sv" ? "Graviditet" : "إدارة الحمل"}
                </h1>
                {form.isCritical && (
                    <span className="bg-red-500 text-[10px] font-black px-3 py-1 rounded-full animate-pulse text-white uppercase">
                        Kritisk / حرج
                    </span>
                )}
            </header>

            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl space-y-3 shadow-2xl">
                <div className="grid grid-cols-2 gap-2">
                    <input
                        type="date"
                        className="rounded-xl bg-white/5 border border-white/10 p-3 text-white text-sm outline-none focus:border-pink-500"
                        value={form.date}
                        onChange={(e) => setForm({...form, date: e.target.value})}
                    />
                    <input
                        type="time"
                        className="rounded-xl bg-white/5 border border-white/10 p-3 text-white text-sm outline-none focus:border-pink-500"
                        value={form.time}
                        onChange={(e) => setForm({...form, time: e.target.value})}
                    />
                </div>

                <input
                    className="w-full rounded-xl bg-white/5 border border-white/10 p-4 text-white text-sm outline-none focus:border-pink-500 placeholder:text-white/20"
                    placeholder={lang === "sv" ? "Barnmorska / Läkare" : "القابلة / الطبيب"}
                    value={form.contactPerson}
                    onChange={(e) => setForm({...form, contactPerson: e.target.value})}
                />

                <button
                    onClick={() => setForm({...form, isCritical: !form.isCritical})}
                    className={`w-full p-4 rounded-xl border transition-all text-[10px] font-black uppercase tracking-widest ${
                        form.isCritical ? "bg-red-500/20 border-red-500 text-red-500" : "bg-white/5 border-white/10 text-white/40"
                    }`}
                >
                    {lang === "sv" ? "Kritisk vård" : "رعاية حرجة"}
                </button>

                <button
                    onClick={handleSave}
                    className="w-full rounded-xl bg-pink-600 py-4 text-xs font-black text-white shadow-lg active:scale-95 transition-all uppercase"
                >
                    {lang === "sv" ? "Spara" : "حفظ"}
                </button>
            </div>

            <div className="space-y-3 pb-24">
                {appointments.map(event => (
                    <div key={event.id} className={`p-4 rounded-2xl border backdrop-blur-md ${event.isCritical ? 'border-red-500/30 bg-red-500/5' : 'border-white/5 bg-white/5'}`}>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-white text-sm">{event.reason}</h3>
                                <p className="text-[10px] text-pink-400 font-black uppercase">{event.contactPerson}</p>
                            </div>
                            <div className="text-right text-[10px] text-white/40 font-mono">
                                {event.date} {event.time}
                            </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                            <button onClick={() => sendNotification(event)} className="flex-1 py-2 bg-white/5 rounded-lg text-[10px] text-white font-bold uppercase">
                                {lang === "sv" ? "SMS" : "رسالة"}
                            </button>
                            <button onClick={() => removeAppointment(event.id)} className="px-4 text-white/20 hover:text-red-500">✕</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PregnancyPage;