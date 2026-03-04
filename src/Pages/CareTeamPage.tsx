import React, { useState } from "react";
import { useLanguage } from "../Context/LanguageContext";

interface Contact {
    id: string;
    name: string;
    phone: string;
}

const CareTeamPage: React.FC = () => {
    const { lang } = useLanguage();

    const [team, setTeam] = useState<Contact[]>([]);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const handleAdd = () => {
        if (name.trim() === "" || phone.trim() === "") return;

        const newContact: Contact = {
            id: Date.now().toString(),
            name,
            phone
        };

        setTeam([...team, newContact]);
        setName(""); setPhone("");
    };

    const handleDelete = (id: string) => {
        setTeam(team.filter(member => member.id !== id));
    };

    return (
        <section className="flex flex-col gap-6 p-4">
            <header>
                <h1 className="text-2xl font-bold text-slate-800">
                    {lang === "sv" ? "Vårdteam & Kontakt" : "فريق الرعاية والتواصل"}
                </h1>
            </header>

            <div className="rounded-2xl border-2 border-emerald-50 bg-emerald-50/30 p-5 shadow-sm">
                <div className="space-y-4">
                    <input
                        type="text"
                        className="w-full rounded-xl border border-slate-200 bg-sky-50 p-3"
                        placeholder={lang === "sv" ? "Namn" : "الاسم"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="tel"
                        className="w-full rounded-xl border border-slate-200 bg-sky-50 p-3"
                        placeholder={lang === "sv" ? "Telefonnummer" : "رقم الهاتف"}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <button
                        onClick={handleAdd}
                        className="w-full rounded-xl bg-blue-600  py-4 text-lg font-bold text-white hover:bg-blue-700 shadow-md"
                    >
                        {lang === "sv" ? "Lägg till i Teamet" : "إضافة إلى الفريق"}
                    </button>
                </div>
            </div>

            <div className="space-y-3">
                {team.map(member => (
                    <div key={member.id} className="flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm border-l-4 border-l-emerald-500">
                        <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-xl">🩺</div>
                        <div className="flex-grow">
                            <div className="font-bold text-slate-800">{member.name}</div>
                            <div className="text-sm text-slate-500">{member.phone}</div>
                        </div>
                        <div className="flex gap-2">
                            <a href={`tel:${member.phone}`} className="bg-slate-100 p-2 rounded-full">📞</a>
                            <button onClick={() => handleDelete(member.id)} className="text-red-500 text-xs">حذف</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CareTeamPage;