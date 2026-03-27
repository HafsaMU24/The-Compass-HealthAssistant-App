import type { HealthTopic, TopicSlug } from "../Types/Domain";


const slug = (s: string) => s as TopicSlug;
const HEALTH_TOPICS: HealthTopic[] = [
    {
        slug: slug("112-1177"),
        title: { sv: "112 och 1177", ar: "112 و 1177" },
        description: { sv: "Skillnaden mellan nödsamtal och rådgivning.", ar: "الفرق بين الطوارئ والاستشارة." },
        sections: [
            {
                title: { sv: "112", ar: "112" },
                body: { sv: "Ring vid livsfara.", ar: "اتصل عند خطر على الحياة." },
            },
            {
                title: { sv: "1177", ar: "1177" },
                body: { sv: "För råd och vägledning.", ar: "للنصيحة والتوجيه." },
            },
        ],
    },
];

export default HEALTH_TOPICS