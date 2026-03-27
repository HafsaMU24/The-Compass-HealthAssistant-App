import type { Quiz} from "../Types/Domain";

const QUIZ : Quiz = {
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
                                { id: "b", label: { sv: "Nej", ar: "لا" }, next: "headache-check" },
                        ],
                },
                {
                        id: "headache-check",
                        text: {
                                sv: "Har du huvudvärk just nu?",
                                ar: "هل تعاني من صداع حالياً؟",
                        },
                        options: [
                                { id: "h1", label: { sv: "Ja, svår huvudvärk", ar: "نعم، صداع شديد" }, resultTag: "1177" },
                                { id: "h2", label: { sv: "Nej / Mild", ar: "لا / خفيف" }, next: "urine-color" }, // Går vidare till urin-kollen
                        ],
                },

                {
                        id: "urine-color",
                        text: {
                                sv: "Vilken färg har ditt urin?",
                                ar: "ما هو لون البول لديك؟",
                        },
                        options: [
                                { id: "u1", label: { sv: "Ljusgult / Klart", ar: "أصفر فاتح / شفاف" }, next: "urine-freq" },
                                { id: "u2", label: { sv: "Mörkgult / Orange", ar: "أصفر غامق / برتقالي" }, next: "urine-freq" },
                                { id: "u3", label: { sv: "Rött / Blodigt", ar: "أحمر / مائل للدم" }, resultTag: "vårdcentral" },
                        ],
                },
                {
                        id: "urine-smell",
                        text: {
                                sv: "Luktade urinet starkt eller annorlunda?",
                                ar: "هل لرائحة البول رائحة قوية أو غريبة؟",
                        },
                        options: [
                                { id: "us1", label: { sv: "Ja, väldigt starkt", ar: "نعم، قوية جداً" }, next: "water-intake" },
                                { id: "us2", label: { sv: "Nej, normalt", ar: "لا، طبيعية" }, next: "water-intake" },
                        ],
                },
                {
                        id: "water-intake",
                        text: {
                                sv: "Dricker du tillräckligt med vatten (ca 1.5-2L per dag)?",
                                ar: "هل تشرب كمية كافية من الماء (حوالي 1.5-2 لتر يومياً)؟",
                        },
                        options: [
                                { id: "w1", label: { sv: "Ja, jag dricker bra", ar: "نعم، أشرب جيداً" }, next: "urine-freq" },
                                { id: "w2", label: { sv: "Nej, jag dricker för lite", ar: "لا، أشرب القليل جداً" }, next: "urine-freq" },
                        ],
                },
                {
                        id: "urine-freq",
                        text: {
                                sv: "Hur många gånger har du kissat senaste dygnet?",
                                ar: "كم عدد مرات التبول خلال الـ 24 ساعة الماضية؟",
                        },
                        options: [
                                { id: "f1", label: { sv: "Väldigt sällan (0-2)", ar: "قليل جداً (0-2)" }, resultTag: "1177" },
                                { id: "f2", label: { sv: "Normalt (4-8)", ar: "طبيعي (4-8)" }, next: "chronic-check" },
                                { id: "f3", label: { sv: "Väldigt ofta (10+)", ar: "كثير جداً (+10)" }, next: "chronic-check" },
                        ],
                },

                {
                        id: "chronic-check",
                        text: {
                                sv: "Har du någon av dessa kroniska sjukdomar?",
                                ar: "هل تعاني من أي من هذه الأمراض المزمنة؟",
                        },
                        options: [
                                { id: "c1", label: { sv: "Diabetes", ar: "السكري" }, next: "mental-health" },
                                { id: "c2", label: { sv: "Högt blodtryck", ar: "ضغط الدم المرتفع" }, next: "mental-health" },
                                { id: "c3", label: { sv: "Hjärtsjukdom", ar: "أمراض القلب" }, resultTag: "vårdcentral" },
                                { id: "c4", label: { sv: "Ingen av dessa", ar: "لا يوجد مما سبق" }, next: "mental-health" },
                        ],
                },

                {
                        id: "mental-health",
                        text: {
                                sv: "Hur mår du psykiskt?",
                                ar: "كيف تشعر من الناحية النفسية؟",
                        },
                        options: [
                                { id: "m1", label: { sv: "Mycket nedstämd / Ångest", ar: "حزن شديد / قلق" }, resultTag: "vårdcentral" },
                                { id: "m2", label: { sv: "Orolig eller stressad", ar: "قلق أو مضغوط نفسياً" }, next: "physical-symptoms" },
                                { id: "m3", label: { sv: "Bra / Stabil", ar: "جيد / مستقر" }, next: "physical-symptoms" },
                        ],
                },

                {
                        id: "physical-symptoms",
                        text: {
                                sv: "Har du något av följande symtom?",
                                ar: "هل تعاني من أي من الأعراض التالية؟",
                        },
                        options: [
                                { id: "s1", label: { sv: "Yrsel eller dimsyn", ar: "دوخة أو غشاوة في النظر" }, resultTag: "1177" },
                                { id: "s2", label: { sv: "Ont i magen", ar: "ألم في البطن" }, next: "appetite-sleep" },
                                { id: "s3", label: { sv: "Kalla händer/fötter", ar: "برودة في الأطراف" }, next: "appetite-sleep" },
                                { id: "s4", label: { sv: "Inga av dessa", ar: "لا يوجد شيء مما سبق" }, next: "appetite-sleep" },
                        ],
                },

                {
                        id: "appetite-sleep",
                        text: {
                                sv: "Har du märkt förändringar i sömn eller aptit?",
                                ar: "هل لاحظت تغيرات في نظام نومك أو فقدان للشهية؟",
                        },
                        options: [
                                { id: "as1", label: { sv: "Ja, båda", ar: "نعم، كلاهما" }, resultTag: "vårdcentral" },
                                { id: "as2", label: { sv: "Nej, allt är som vanligt", ar: "لا، كل شيء كالمعتاد" }, next: "medication-check" },
                        ],
                },

                {
                        id: "medication-check",
                        text: {
                                sv: "Använder du mediciner eller kosttillskott just nu?",
                                ar: "هل تستخدم أدوية أو مكملات غذائية (مسكنات) حالياً؟",
                        },
                        options: [
                                { id: "med1", label: { sv: "Ja", ar: "نعم" }, next: "q3" },
                                { id: "med2", label: { sv: "Nej", ar: "لا" }, next: "q3" },
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
        ]
};

export default QUIZ;