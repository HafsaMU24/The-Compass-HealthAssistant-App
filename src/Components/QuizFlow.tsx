import React from "react";
import QUIZ  from "../Data/QuizData";
import type { QuizQuestion, ResultTag } from "../Types/Domain";
import {useLanguage}  from "../Context/LanguageContext";
import  QuizService  from "../Services/QuizService";
import SpecialButton from "./SpecialButton";

type QuizState =
    | { kind: "question"; q: QuizQuestion }
    | { kind: "result"; tag: ResultTag }
    | { kind: "error"; message: string };

const isResultTag = (x: unknown): x is ResultTag =>
    x === "112" || x === "1177" || x === "vårdcentral" || x === "egen-vård";

const QuizFlow: React.FC = () => {
    const { lang } = useLanguage();

    const byId = React.useMemo(() => new Map(QUIZ.questions.map((q) => [q.id, q])), []);
    const [state, setState] = React.useState<QuizState>({
        kind: "question",
        q: QUIZ.questions[0],
    });

    const restart = () => setState({ kind: "question", q: QUIZ.questions[0] });

    const pick = (opt: { next?: string; resultTag?: unknown }) => {
        if (opt.resultTag && isResultTag(opt.resultTag)) {
            QuizService.addHistory({
                quizId: QUIZ.id,
                finishedAt: Date.now(),
                resultTag: opt.resultTag,
            });
            setState({ kind: "result", tag: opt.resultTag });
            return;
        }

        if (opt.next) {
            const q = byId.get(opt.next);

            if (q) {
                setState({ kind: "question", q });
            } else {
                const messageSv = `Quiz-data fel: kunde inte hitta nästa fråga med id="${opt.next}".`;
                const messageAr = `خطأ في بيانات الاختبار: لم يتم العثور على السؤال التالي بالمعرّف "${opt.next}".`;

                if (import.meta.env.DEV) {
                    console.error("[QuizFlow] Missing next question id:", opt.next, "Available ids:", [...byId.keys()]);
                }

                setState({
                    kind: "error",
                    message: lang === "sv" ? messageSv : messageAr,
                });
            }
        }
    };

    //  ERROR UI
    if (state.kind === "error") {
        return (
            <div className="space-y-3">
                <div className="rounded-2xl border border-red-300 bg-red-50 p-4">
                    <h2 className="text-lg font-semibold">
                        {lang === "sv" ? "Något gick fel" : "حدث خطأ"}
                    </h2>
                    <p className="mt-2 text-sm text-black/80">{state.message}</p>
                    <p className="mt-2 text-xs text-black/60">
                        {lang === "sv"
                            ? "Tips: kontrollera att 'next' i QuizData matcher ett befintligt question-id."
                            : "نصيحة: تأكد أن قيمة 'next' في QuizData تطابق معرّف سؤال موجود."}
                    </p>
                </div>

                <button className="rounded-xl border px-3 py-2 text-sm" onClick={restart} type="button">
                    {lang === "sv" ? "Starta om" : "إعادة البدء"}
                </button>
            </div>
        );
    }

    //  RESULT UI
    if (state.kind === "result") {
        const msg: Record<ResultTag, Record<"sv" | "ar", string>> = {
            "112": { sv: "Rekommendation: Ring 112 nu.", ar: "التوصية: اتصل بـ 112 الآن." },
            "1177": { sv: "Rekommendation: Kontakta 1177 för råd.", ar: "التوصية: تواصل مع 1177." },
            "vårdcentral": { sv: "Rekommendation: Boka vårdcentral.", ar: "التوصية: احجز في المركز الصحي." },
            "egen-vård": { sv: "Rekommendation: Egenvård och följ symtom.", ar: "التوصية: رعاية ذاتية ومتابعة الأعراض." },
        };

        return (
            <div className="space-y-3">
                <div className="rounded-2xl border p-4">
                    <h2 className="text-lg font-semibold">{msg[state.tag][lang]}</h2>
                    {(state.tag === "112" || state.tag === "1177") && (
                        <div className="mt-3">
                            <SpecialButton />
                        </div>
                    )}
                </div>

                <button className="rounded-xl border px-3 py-2 text-sm" onClick={restart} type="button">
                    {lang === "sv" ? "Starta om" : "إعادة البدء"}
                </button>
            </div>
        );
    }

    // QUESTION UI
    return (
        <div className="space-y-3">
            <h1 className="text-2xl font-semibold">{QUIZ.title[lang]}</h1>

            <div className="rounded-2xl border p-4">
                <p className="text-sm text-black/80">{state.q.text[lang]}</p>

                <div className="mt-3 grid gap-2">
                    {state.q.options.map((o) => (
                        <button
                            key={o.id}
                            className="rounded-xl border px-3 py-2 text-left text-sm hover:bg-black/5"
                            onClick={() => pick(o)}
                            type="button"
                        >
                            {o.label[lang]}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuizFlow;
