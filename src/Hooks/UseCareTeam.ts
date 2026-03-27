import { useState, useEffect } from "react";
import StorageService from "../Services/StorageService";
import type { ContactPerson } from "../Types/Domain";

const useCareTeam = () => {
    const [team, setTeam] = useState<ContactPerson[]>([]);

    useEffect(() => {
        const saved = StorageService.get<ContactPerson[]>("careTeam") || [];
        setTeam(saved);
    }, []);

    const addMember = (name: string, phone: string, role: "Doctor" | "Caregiver" | "Companion") => {
        const newMember: ContactPerson = {
            id: Date.now().toString(),
            name,
            phone,
            role
        };
        const updated = [...team, newMember];
        setTeam(updated);
        StorageService.set("careTeam", updated);

    };

    const deleteMember = (id: string) => {
        const updated = team.filter(m => m.id !== id);
        setTeam(updated);
        StorageService.set("careTeam", updated);
    };

    return { team, addMember, deleteMember };
};

export default useCareTeam;