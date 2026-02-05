import React from "react";
import { Link } from "react-router-dom";
import  {useLanguage} from "../Context/LanguageContext";
import SpecialButton from "../Components/SpecialButton";

const HomePage: React.FC = () => {
    const { t, lang } = useLanguage();

    return (
        <section className="space-y-6">
            <div className="rounded-2xl border p-5">
                <h1 className="text-2xl font-semibold">{t("welcome")}</h1>

                <p className="mt-2 text-sm text-black/70">
                    {lang === "sv"
                        ? "MVP: svenska/arabiska, RTL, uppläsning (TTS), hälsosidor och quiz."
                        : "نسخة MVP: العربية/السويدية، RTL، تحويل النص إلى كلام، صفحات صحية واختبار."}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                    <Link to="/quiz" className="rounded-xl bg-black px-3 py-2 text-sm text-white">
                        {t("startQuiz")}
                    </Link>
                    <Link to="/health" className="rounded-xl border px-3 py-2 text-sm">
                        {t("health")}
                    </Link>
                    <SpecialButton />
                </div>
            </div>
        </section>
    );
};

export default HomePage;
