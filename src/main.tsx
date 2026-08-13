import React from "react";
import ReactDOM from "react-dom/client";
import SkillpathCourses from "./code/SkillpathCourses";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SkillpathCourses accentColor="#6366F1" cardBorderRadius={12} />
  </React.StrictMode>
);
