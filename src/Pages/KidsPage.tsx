import React, { useState } from "react";
import {useLanguage} from "../Context/LanguageContext";
import { UseKidsHealth } from "../Hooks/UseKidsHealth.ts";
import type { KidEvent } from "../Types/Domain"


const KidsPage: React.FC = () => {
    const { lang } = useLanguage();
    const { events, addEvent, deleteEvent } = UseKidsHealth();
    const [formData, setFormData] = useState({
        childName: "",
        type: "Doctor" as KidEvent["type"],
        note: "",
        date: "",
        parentPhone: ""
    });

    const handleSave = () => {
        if (!formData.childName || !formData.parentPhone) return;
        addEvent(formData);
        setFormData({
            childName: "",
            type: "Doctor",
            date: "",
            parentPhone: "",
            note: ""
        });
    };

    const sendSMS = (event: KidEvent) => {
        const message = lang === "sv"
            ? `Påminnelse för ${event.childName}: ${event.type} den ${event.date}. Notering: ${event.note}`
            : `تذكير لـ ${event.childName}: ${event.type} بتاريخ ${event.date}. ملاحظة: ${event.note}`;
        window.location.href = `sms:${event.parentPhone}?body=${encodeURIComponent(message)}`;
    };

    return (
        <section className="flex flex-col gap-6 p-2 animate-in fade-in duration-500">
            <header>
                <h1 className="text-2xl font-black text-white italic uppercase tracking-tighter">
                    {lang === "sv" ? "Barnens Hälsa" : "صحة الأطفال"}
                </h1>
            </header>

            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl space-y-4 shadow-2xl">
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-amber-400 px-1 uppercase tracking-widest">
                        {lang === "sv" ? "Information" : "معلومات"}
                    </label>
                    <input
                        className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-amber-400 transition-all placeholder:text-white/20"
                        placeholder={lang === "sv" ? "Barnets namn" : "اسم الطفل"}
                        value={formData.childName}
                        onChange={(e) => setFormData({...formData, childName: e.target.value})}
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <select
                        className="w-full rounded-xl border border-white/10 bg-[#15161c] p-4 text-white outline-none focus:border-amber-400 text-sm"
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value as KidEvent["type"]})}
                    >
                        <option value="Doctor">{lang === "sv" ? "Läkare" : "طبيب"}</option>
                        <option value="Dentist">{lang === "sv" ? "Tandläkare" : "طبيب أسنان"}</option>
                        <option value="Prescription">{lang === "sv" ? "Medicin" : "دواء"}</option>
                        <option value="Chronic">{lang === "sv" ? "Kronisk" : "حالة مزمنة"}</option>
                    </select>

                    <input
                        type="date"
                        className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-amber-400 text-sm"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                </div>

                <input
                    type="tel"
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-amber-400 transition-all placeholder:text-white/20"
                    placeholder={lang === "sv" ? "Telefon för SMS" : "رقم الهاتف للرسائل"}
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({...formData, parentPhone: e.target.value})}
                />

                <textarea
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-amber-400 transition-all placeholder:text-white/20"
                    placeholder={lang === "sv" ? "Anteckning" : "ملاحظة"}
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                />

                <button
                    onClick={handleSave}
                    className="w-full rounded-xl bg-amber-500 py-4 text-xs font-black text-white shadow-lg shadow-amber-900/20 active:scale-95 transition-all uppercase tracking-widest"
                >
                    {lang === "sv" ? "Spara händelse" : "حفظ الموعد"}
                </button>
            </div>

            <div className="space-y-3 pb-24">
                {events.length === 0 ? (
                    <p className="text-center text-white/20 text-xs py-10 uppercase font-bold tracking-tighter">
                        {lang === "sv" ? "Inga händelser registrerade" : "لا يوجد مواعيد مسجلة"}
                    </p>
                ) : (
                    events.map(event => (
                        <div key={event.id} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur-md group hover:bg-white/10 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-amber-500/20 flex items-center justify-center text-xl shadow-inner transition-transform group-hover:scale-110">
                                    {event.type === "Dentist" ? "🦷" : "👶"}
                                </div>
                                <div>
                                    <div className="font-bold text-white text-sm">{event.childName}</div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[9px] text-amber-400 font-black uppercase tracking-tighter">
                                            {event.type}
                                        </span>
                                        <span className="text-[10px] text-white/30 font-mono">
                                            {event.date}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => sendSMS(event)}
                                    className="p-3 bg-blue-500/10 text-blue-400 rounded-xl hover:bg-blue-500 hover:text-white transition-all text-[10px] font-bold"
                                >
                                    SMS
                                </button>
                                <button
                                    onClick={() => deleteEvent(event.id)}
                                    className="p-3 text-white/10 hover:text-red-500 transition-all"
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

export default KidsPage;