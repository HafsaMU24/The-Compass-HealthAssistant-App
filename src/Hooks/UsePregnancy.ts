import { useState, useEffect } from "react";
import type { PregnancyEvent } from "../Types/Domain";
import StorageService from "../Services/StorageService";

const STORAGE_KEY = "pregnancyEvent";

const usePregnancy = () => {
    const [appointments, setAppointments] = useState<PregnancyEvent[]>([]);

    useEffect(() => {
        const saved = StorageService.get<PregnancyEvent[]>(STORAGE_KEY);
        if (saved && Array.isArray(saved)) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setAppointments([...saved]);
            console.log("Data is loaded from storage");
        }else {
            setAppointments([]);
            console.log("No data found or data is corrupted")
        }
        }, []);



    const addAppointment = (app: Omit<PregnancyEvent, "id">) => {
        const newApp = { ...app, id: Date.now().toString() };
        const updated = [newApp, ...appointments];
        setAppointments(updated);
        StorageService.set(STORAGE_KEY, updated);
    };

    const removeAppointment = (id: string) => {
        const updated = appointments.filter(a => a.id !== id);
        setAppointments(updated);
        StorageService.set(STORAGE_KEY, updated);
    };

    return { appointments, addAppointment, removeAppointment };
};

export default usePregnancy;