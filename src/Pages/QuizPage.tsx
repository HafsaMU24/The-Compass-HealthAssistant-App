import React, { useState } from "react";
import QUIZ from "../Data/QuizData";
import { useLanguage } from "../Context/LanguageContext";
import SpeechButton from "../Components/SpeechButton";
import type {QuizOption } from "../Types/Domain";
import QuizService from "../Services/QuizService";


const QuizPage: React.FC = () => {
    const { lang } = useLanguage();
    const [currentQuestionId, setCurrentQuestionId] = useState("q1");
    const [result, setResult] = useState<string | null>(null);

    const currentQuestion = QUIZ.questions.find(q => q.id === currentQuestionId);
    const textToRead = currentQuestion
        ? currentQuestion.text[lang as 'sv' | 'ar']
        : "";

    const handleOptionClick = (option: QuizOption) => {
        if (option.resultTag !== undefined) {
            QuizService.addHistory({
                quizId: String(QUIZ.id),
                finishedAt: new Date().getTime(),
                resultTag: option.resultTag,
            });

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
            <div className="flex flex-col items-center justify-center min-h-[400] bg-[#0a192f] rounded-[2.5rem] p-8 text-center animate-in fade-in duration-500 border border-white/5 shadow-2xl">
                <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <span className="text-4xl animate-bounce">📋</span>
                </div>
                <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter italic">
                    {lang === "sv" ? "Rekommendation:" : "التوصية المقترحة:"}
                </h2>
                <div className="bg-blue-600 text-white px-8 py-4 rounded-[2rem] font-black text-2xl shadow-[0_0_30px_rgba(37,99,235,0.4)] mb-8 transform hover:scale-105 transition-transform">
                    {result.toUpperCase()}
                </div>
                <button
                    onClick={resetQuiz}
                    className="text-blue-400 hover:text-white underline font-bold tracking-widest text-xs uppercase transition-all"
                >
                    {lang === "sv" ? "Gör om testet" : "إعادة الاختبار"}
                </button>
            </div>
        );
    }

    if (!currentQuestion) return null;

    return (
        <div className="flex flex-col min-h-[500] bg-[#0a192f] rounded-[2.5rem] p-8 shadow-2xl border border-white/5 animate-in slide-in-from-bottom-6 duration-500 relative overflow-hidden">

            <div className="flex justify-between items-start mb-10">
                <div className="space-y-1">
                    <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] opacity-80">
                        {QUIZ.title[lang as 'sv' | 'ar']}
                    </p>
                    <div className="h-1 w-10 bg-blue-600 rounded-full"></div>
                </div>


                <div className="z-50 scale-70 origin-top-left">
                    <SpeechButton text={textToRead} />
                </div>
            </div>


            <div className="mb-10 min-h-[80] flex items-center">
                <h2 className="text-2xl font-black text-white leading-tight tracking-tight italic uppercase">
                    {currentQuestion.text[lang as 'sv' | 'ar']}
                </h2>
            </div>


            <div className="flex flex-col gap-4 mt-auto">
                {currentQuestion.options.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => handleOptionClick(option)}
                        className="group relative flex items-center justify-between w-full p-6 bg-white/5 hover:bg-blue-600/20 border border-white/10 hover:border-blue-500/50 rounded-2xl transition-all duration-300 active:scale-[0.97] shadow-lg"
                    >
                        <span className="text-lg font-bold text-slate-100 group-hover:text-white transition-colors">
                            {option.label[lang as 'sv' | 'ar']}
                        </span>
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-600 shadow-md transition-all duration-300">
                            <span className="text-blue-400 group-hover:text-white text-sm font-bold">
                                {lang === 'ar' ? "←" : "→"}
                            </span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuizPage;