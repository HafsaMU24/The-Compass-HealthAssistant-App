import type { QuizQuestion } from "../Types/Domain";

const QUIZ = {
       id: "triage-basic",
        title: {
                sv: "Hitta rätt vårdnivå",
                ar: "اختيار مستوى الرعاية المناسب",
        },
        questions: [
                {
                        id: "q1",
                        text: {
                                sv: "Är det livsfara just nu?",
                                ar: "هل هناك خطر على الحياة الآن؟",
                        },
                        options: [
                                { id: "a", label: { sv: "Ja", ar: "نعم" }, resultTag: "112" },
                                { id: "b", label: { sv: "Nej", ar: "لا" }, next: "q2" },
                        ],
                },
                {
                        id: "q2",
                        text: {
                                sv: "Behöver du rådgivning idag?",
                                ar: "هل تحتاج نصيحة اليوم؟",
                        },
                        options: [
                                { id: "a", label: { sv: "Ja", ar: "نعم" }, resultTag: "1177" },
                                { id: "b", label: { sv: "Nej", ar: "لا" }, next: "q3" },
                        ],
                },
                {
                        id: "q3",
                        text: {
                                sv: "Har du besvär som återkommer?",
                                ar: "هل الأعراض مستمرة أو تتكرر؟",
                        },
                        options: [
                                { id: "a", label: { sv: "Ja", ar: "نعم" }, resultTag: "vårdcentral" },
                                { id: "b", label: { sv: "Nej, milda", ar: "لا، خفيفة" }, resultTag: "egen-vård" },
                        ],
                },
        ] satisfies QuizQuestion[],
};

export default QUIZ;