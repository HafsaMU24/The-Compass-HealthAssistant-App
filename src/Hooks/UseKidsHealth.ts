import { useState, useEffect } from "react";
import StorageService from "../Services/StorageService";

interface KidEvent {
    id: string;
    childName: string;
    type: "Dentist" | "Doctor" | "Prescription" | "Chronic";
    note: string;
    date: string;
    parentPhone: string;
}

const STORAGE_KEY = "kidEvents";

export const UseKidsHealth = () => {
    const [events, setEvents] = useState<KidEvent[]>([]);


    useEffect(() => {
        const saved = StorageService.get<KidEvent[]>(STORAGE_KEY);
        if (saved) setEvents(saved);
    }, []);

    const addEvent = (event: Omit<KidEvent, "id">) => {
        const newEvent = { ...event, id: Date.now().toString() };
        const updated = [newEvent, ...events];
        setEvents(updated);
        StorageService.set(STORAGE_KEY, updated);
    };

    const deleteEvent = (id: string) => {
        const updated = events.filter(e => e.id !== id);
        setEvents(updated);
        StorageService.set(STORAGE_KEY, updated);
    };

    return { events, addEvent, deleteEvent };
};

export default UseKidsHealth;