import React from "react";
import "./Hero.css";

/**
 * Hero Component
 * Displays the page headline, supporting text, and a CTA button that
 * smoothly scrolls down to the courses section.
 */
export default function Hero({ accentColor = "#6366F1" }) {
  const handleScrollToCourses = () => {
    const section = document.getElementById("courses-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        <h1 className="hero-title">Build skills that move you forward.</h1>
        <p className="hero-subtitle">
          Practical courses designed to help you learn by building.
        </p>
        <button
          type="button"
          className="hero-cta-btn"
          onClick={handleScrollToCourses}
          style={{ backgroundColor: accentColor }}
          aria-label="Explore Courses"
        >
          Explore Courses
        </button>
      </div>
    </section>
  );
}
