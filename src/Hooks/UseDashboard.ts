import { useState, useEffect } from "react";
import StorageService from "../Services/StorageService";
import type {Medication, ContactPerson } from "../Types/Domain"

export const useDashboard = () => {
    const [data, setData] = useState<{ meds: Medication[]; team: ContactPerson[] } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = () => {
            try {
                setLoading(true);
                const meds = StorageService.get<Medication[]>("userDefaults") || [];
                const team = StorageService.get<ContactPerson[]>("careTeam") || [];

                setData({ meds, team });
                setLoading(false);
            } catch (error) {
                setError("حدث خطأ أثناء تحميل البيانات");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};