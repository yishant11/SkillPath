// SkillpathCourses — Framer Code Component
// @framerSupportedLayoutWidth any
// @framerSupportedLayoutHeight any

import * as React from "react";
import { addPropertyControls, ControlType } from "framer";
import Hero from "../components/Hero.jsx";
import CoursesSection from "../components/CoursesSection.jsx";
import Footer from "../components/Footer.jsx";
import "../global.css";

interface SkillpathCoursesProps {
  accentColor?: string;
  cardBorderRadius?: number;
}

/**
 * SkillpathCourses Component
 * Framer Code Component entry point that composes Hero, CoursesSection,
 * and Footer with customizable property controls.
 */
export default function SkillpathCourses(props: SkillpathCoursesProps) {
  const { accentColor = "#6366F1", cardBorderRadius = 12 } = props;

  return (
    <div className="skillpath-root">
      <Hero accentColor={accentColor} />
      <CoursesSection
        accentColor={accentColor}
        cardBorderRadius={cardBorderRadius}
      />
      <Footer />
    </div>
  );
}

// Framer Property Controls
addPropertyControls(SkillpathCourses, {
  accentColor: {
    type: ControlType.Color,
    title: "Accent Color",
    defaultValue: "#6366F1",
  },
  cardBorderRadius: {
    type: ControlType.Number,
    title: "Card Border Radius",
    defaultValue: 12,
    min: 0,
    max: 32,
    step: 1,
  },
});
