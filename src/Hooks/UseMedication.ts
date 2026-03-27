import { useState, useEffect } from "react";
import StorageService from "../Services/StorageService";
import type { Medication } from "../Types/Domain";

 const useMedication = () => {
    const [meds, setMeds] = useState<Medication[]>([]);

    useEffect(() => {
        const saved = StorageService.get<Medication[]>("medication");
        if (saved) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setMeds(saved);
        }
    }, []);

    const addMedication = (name: string, dosage: string, time: string) => {
        const newMed: Medication = { id: Date.now().toString(), name, dosage, time };
        const updated = [...meds, newMed];
        setMeds(updated);
        StorageService.set("medication", updated);
    };

    const deleteMedication = (id: string) => {
        const updated = meds.filter(m => m.id !== id);
        setMeds(updated);
        StorageService.set("medication", updated);
    };

    return { meds, addMedication, deleteMedication };
};

export default useMedication;