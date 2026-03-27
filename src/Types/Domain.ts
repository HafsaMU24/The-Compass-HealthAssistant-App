import type { Lang } from "./I18n";

export type Brand<K, T extends string> = K & { __brand: T };
export type TopicSlug = Brand<string, "TopicSlug">;

export type Section = {
    title: Record<Lang, string>;
    body: Record<Lang, string>;
};

export type HealthTopic = {
    slug: TopicSlug;
    title: Record<Lang, string>;
    description: Record<Lang, string>;
    sections: Section[];
};

export type ResultTag = "112" | "1177" | "vårdcentral" | "egen-vård";

export type QuizOption = {
    id: string;
    label: Record<Lang, string>;
    next?: string;
    resultTag?: ResultTag;
};

export type QuizQuestion = {
    id: string;
    text: Record<Lang, string>;
    options: QuizOption[];
};

export type Quiz = {
    id: string;
    title: Record<Lang, string>;
    questions: QuizQuestion[];
};

export type Medication = {
    id: string;
    name: string;
    dosage: string;
    time: string;
};
export type KidEventType = "Dentist" | "Doctor" | "Prescription" | "Chronic";

export interface KidEvent {
    id: string;
    childName: string;
    type: KidEventType;
    note: string;
    date: string;
    parentPhone: string;
}

export interface PregnancyEvent {
    id: string;
    date: string;
    time: string;
    location: string;
    contactPerson: string;
    reason: string;
    isCritical: boolean;
    notes?: string;
}

export type ContactPerson = {
    id: string;
    name: string;
    role: "Doctor" | "Caregiver" | "Companion";
    phone: string;
};

export type DemoUser = {
    id: Brand<string, "UserId">;
    email: string;
    name: string;
};

export type DemoSession = DemoUser & {
    issuedAt: number;
    provider: "local";
};

export type LoginInput =
    | { kind: "existing"; email: string; password: string }
    | { kind: "new"; email: string; password: string; name: string };

export const isNewUser = (i: LoginInput): i is Extract<LoginInput, { kind: "new" }> =>
    i.kind === "new";

