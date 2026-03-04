import React, { useState } from "react";
import QUIZ from "../Data/QuizData";
import { useLanguage } from "../Context/LanguageContext";

const QuizPage: React.FC = () => {
    const { lang } = useLanguage();
    const [currentQuestionId, setCurrentQuestionId] = useState("q1");
    const [result, setResult] = useState<string | null>(null);

    const currentQuestion = QUIZ.questions.find(q => q.id === currentQuestionId);

    const handleOptionClick = (option: any) => {
        if (option.resultTag) {
            setResult(option.resultTag);
        } else if (option.next) {
            setCurrentQuestionId(option.next);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestionId("q1");
        setResult(null);
    };

    if (result) {
        return (
            <div className="flex flex-col items-center justify-center p-4 text-center animate-in fade-in duration-500">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl">📋</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                    {lang === "sv" ? "Rekommendation:" : "التوصية المقترحة:"}
                </h2>
                <div className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-xl shadow-lg mb-6">
                    {result.toUpperCase()}
                </div>
                <button
                    onClick={resetQuiz}
                    className="text-blue-400 hover:text-white underline font-medium transition-colors"
                >
                    {lang === "sv" ? "Gör om testet" : "إعادة الاختبار"}
                </button>
            </div>
        );
   }

    if (!currentQuestion) return null;

    return (
        <div className="flex flex-col gap-6 p-2 animate-in slide-in-from-bottom-4 duration-300">

            <div className="space-y-2">
                <p className="text-blue-400 text-xs font-bold uppercase tracking-widest">
                    {QUIZ.title[lang as 'sv' | 'ar']}
                </p>
                <h2 className="text-2xl font-extrabold text-white leading-tight">
                    {currentQuestion.text[lang as 'sv' | 'ar']}
                </h2>
            </div>


            <div className="flex flex-col gap-3">
                {currentQuestion.options.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => handleOptionClick(option)}
                        className="group relative flex items-center justify-between w-full p-4 bg-white/5 hover:bg-white/15 border border-white/10 hover:border-blue-400/50 rounded-2xl transition-all duration-200 active:scale-[0.98]"
                    >
                        <span className="text-lg font-bold text-slate-200 group-hover:text-white">
                            {option.label[lang as 'sv' | 'ar']}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                            <span className="text-blue-400 group-hover:text-white text-sm">→</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuizPage;