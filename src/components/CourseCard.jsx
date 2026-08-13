import React from "react";
import "./CourseCard.css";

/**
 * Formats price based on detected country:
 * - IN: pricePaise / 100 -> ₹1,999 (Indian currency format, no decimals)
 * - US: priceUsdCents / 100 -> $39.99 (US currency format)
 * - Failed/missing country: "Price unavailable"
 */
function formatPrice(course, countryCode) {
  if (!countryCode) return "Price unavailable";

  try {
    if (countryCode === "IN") {
      if (course.pricePaise == null) return "Price unavailable";
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(course.pricePaise / 100);
    }

    if (countryCode === "US") {
      if (course.priceUsdCents == null) return "Price unavailable";
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(course.priceUsdCents / 100);
    }
  } catch {
    return "Price unavailable";
  }

  return "Price unavailable";
}

/**
 * CourseCard Component
 * Pure presentational component that displays one course card.
 */
export default function CourseCard({
  course,
  countryCode,
  accentColor = "#6366F1",
  borderRadius = 12,
}) {
  const priceDisplay = formatPrice(course, countryCode);
  const hasPrice = priceDisplay !== "Price unavailable";

  return (
    <article
      className="course-card"
      style={{
        borderRadius: `${borderRadius}px`,
      }}
    >
      {/* Category Pill (uses accent color with subtle opacity) */}
      <div>
        <span
          className="course-card-category"
          style={{
            color: accentColor,
            backgroundColor: `${accentColor}14`, // ~8% opacity
          }}
        >
          {course.mainCategory || "General"}
        </span>
      </div>

      {/* Course Title */}
      <h3 className="course-card-title">{course.courseName || "Untitled Course"}</h3>

      {/* Description (2-line clamped via CSS) */}
      <p className="course-card-desc">
        {course.description || ""}
      </p>

      {/* Price Section */}
      <div className="course-card-price-row">
        <span
          className={hasPrice ? "course-card-price" : "course-card-price-unavailable"}
        >
          {priceDisplay}
        </span>
      </div>

      {/* Refundable Badge (rendered only when refundable is true) */}
      {course.refundable === true && (
        <div>
          <span className="course-card-refundable">✓ Refundable</span>
        </div>
      )}
    </article>
  );
}
