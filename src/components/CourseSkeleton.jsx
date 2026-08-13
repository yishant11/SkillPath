import React from "react";
import "./CourseSkeleton.css";

/**
 * CourseSkeleton Component
 * Reusable loading placeholder with a pure CSS shimmer animation.
 * Exactly matches the typography and layout dimensions of CourseCard.
 */
export default function CourseSkeleton({ borderRadius = 12 }) {
  return (
    <div
      className="course-skeleton-card"
      style={{
        borderRadius: `${borderRadius}px`,
      }}
      aria-hidden="true"
    >
      {/* Category pill placeholder */}
      <div className="course-skeleton-bar course-skeleton-category" />

      {/* Title placeholder */}
      <div className="course-skeleton-bar course-skeleton-title" />

      {/* Description 2 lines placeholder */}
      <div className="course-skeleton-desc">
        <div className="course-skeleton-bar course-skeleton-line-1" />
        <div className="course-skeleton-bar course-skeleton-line-2" />
      </div>

      {/* Price placeholder */}
      <div className="course-skeleton-price">
        <div className="course-skeleton-bar course-skeleton-price-bar" />
      </div>
    </div>
  );
}
