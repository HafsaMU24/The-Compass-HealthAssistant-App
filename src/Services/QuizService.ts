import type{ ResultTag } from "../Types/Domain";
import StorageService from "./StorageService";

export type QuizHistoryItem = {
    quizId: string;
    finishedAt: number;
    resultTag: ResultTag;
};

 const QuizService = {
    addHistory(item: QuizHistoryItem) {
        const prev = StorageService.get<QuizHistoryItem[]>("quizHistory") ?? [];
        StorageService.set("quizHistory", [item, ...prev].slice(0, 20));
    },

    getHistory() {
        return StorageService.get<QuizHistoryItem[]>("quizHistory") ?? [];
    },
};

 export default QuizService;