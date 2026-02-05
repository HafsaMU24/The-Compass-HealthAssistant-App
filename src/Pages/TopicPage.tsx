import React from "react";
import { Navigate, useParams } from "react-router-dom";
import  HEALTH_TOPICS from "../Data/HealthTopics";
import PageRenderer from "../Components/PageRenderer";

const TopicPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const topic = HEALTH_TOPICS.find((t) => t.slug === slug);

    if (!topic) return <Navigate to="/health" replace />;

    return <PageRenderer topic={topic} />;
};

export default TopicPage;
