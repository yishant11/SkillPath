import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import CourseCard from "./CourseCard.jsx";
import CourseSkeleton from "./CourseSkeleton.jsx";
import "./CoursesSection.css";

const COURSES_URL = "https://syncsphere-hiv6.onrender.com/assignment/course-data";
const COUNTRY_URL = "https://syncsphere-hiv6.onrender.com/assignment/country-code";
const SKELETON_COUNT = 6;

/**
 * CoursesSection Component
 * Manages API fetching, error handling, loading/empty/success states,
 * search filtering, and price sorting for the courses grid.
 */
export default function CoursesSection({
  accentColor = "#6366F1",
  cardBorderRadius = 12,
}) {
  const [courses, setCourses] = useState([]);
  const [countryCode, setCountryCode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [coursesError, setCoursesError] = useState(false);
  const [countryError, setCountryError] = useState(false);

  // Search & Sort state
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const abortControllerRef = useRef(null);

  /**
   * Fetch courses and country data independently using Promise.allSettled.
   * If one endpoint fails (404/500), the other can still succeed.
   */
  const fetchData = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setCoursesError(false);
    setCountryError(false);

    try {
      const [coursesResult, countryResult] = await Promise.allSettled([
        fetch(COURSES_URL, { signal: controller.signal }).then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        }),
        fetch(COUNTRY_URL, { signal: controller.signal }).then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        }),
      ]);

      if (controller.signal.aborted) return;

      // 1. Process Courses
      if (
        coursesResult.status === "fulfilled" &&
        Array.isArray(coursesResult.value)
      ) {
        setCourses(coursesResult.value);
        setCoursesError(false);
      } else {
        setCourses([]);
        setCoursesError(true);
      }

      // 2. Process Country
      if (
        countryResult.status === "fulfilled" &&
        (countryResult.value?.country_code === "IN" ||
          countryResult.value?.country_code === "US")
      ) {
        setCountryCode(countryResult.value.country_code);
        setCountryError(false);
      } else {
        setCountryCode(null);
        setCountryError(true);
      }
    } catch {
      if (controller.signal.aborted) return;
      setCourses([]);
      setCoursesError(true);
      setCountryError(true);
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchData();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);

  // Filter courses by search query across courseName and mainCategory (case-insensitive)
  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) return courses;
    const query = searchQuery.toLowerCase().trim();
    return courses.filter(
      (course) =>
        (course.courseName || "").toLowerCase().includes(query) ||
        (course.mainCategory || "").toLowerCase().includes(query)
    );
  }, [courses, searchQuery]);

  // Sort courses by price based on active currency field
  const sortedCourses = useMemo(() => {
    if (sortBy === "default" || !countryCode) return filteredCourses;
    return [...filteredCourses].sort((a, b) => {
      const field = countryCode === "US" ? "priceUsdCents" : "pricePaise";
      const priceA = a[field] ?? 0;
      const priceB = b[field] ?? 0;
      return sortBy === "price-asc" ? priceA - priceB : priceB - priceA;
    });
  }, [filteredCourses, sortBy, countryCode]);

  return (
    <section id="courses-section" className="courses-section">
      <div className="courses-container">
        {/* Section Header */}
        <div className="courses-header">
          <h2 className="courses-title">Featured Courses</h2>
          <p className="courses-subtitle">
            Start learning with expert-crafted content
          </p>
          {countryError && !loading && !coursesError && courses.length > 0 && (
            <p className="courses-country-notice">
              Pricing currency temporarily unavailable
            </p>
          )}
        </div>

        {/* STATE 1: LOADING (Shimmer Skeleton Grid) */}
        {loading && (
          <div
            className="courses-grid"
            role="status"
            aria-label="Loading courses..."
          >
            {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
              <CourseSkeleton key={index} borderRadius={cardBorderRadius} />
            ))}
          </div>
        )}

        {/* STATE 2: ERROR (Courses API failed) */}
        {!loading && coursesError && (
          <div className="courses-state-box" role="alert">
            <svg
              className="courses-state-icon"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="24" cy="24" r="22" stroke="#E2E8F0" strokeWidth="2" />
              <path
                d="M24 16v10"
                stroke="#94A3B8"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="24" cy="32" r="1.5" fill="#94A3B8" />
            </svg>
            <h3 className="courses-state-title">Unable to load courses right now.</h3>
            <p className="courses-state-desc">Please try again.</p>
            <button
              type="button"
              className="courses-retry-btn"
              onClick={fetchData}
              style={{ backgroundColor: accentColor }}
              aria-label="Retry loading courses"
            >
              Retry
            </button>
          </div>
        )}

        {/* STATE 3: EMPTY (API returned empty array []) */}
        {!loading && !coursesError && courses.length === 0 && (
          <div className="courses-state-box">
            <svg
              className="courses-state-icon"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="8"
                y="12"
                width="32"
                height="24"
                rx="3"
                stroke="#E2E8F0"
                strokeWidth="2"
              />
              <path
                d="M16 22h16M16 28h10"
                stroke="#94A3B8"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <h3 className="courses-state-title">No courses available right now.</h3>
            <p className="courses-state-desc">Check back soon for new content.</p>
          </div>
        )}

        {/* STATE 4: SUCCESS (Render Courses Grid + Search/Sort) */}
        {!loading && !coursesError && courses.length > 0 && (
          <>
            {/* Search & Sort Controls Bar */}
            <div className="courses-controls">
              <input
                type="text"
                className="courses-search-input"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search courses"
              />
              <select
                className="courses-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort courses by price"
              >
                <option value="default">Sort: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {/* Courses Grid */}
            {sortedCourses.length > 0 ? (
              <div className="courses-grid">
                {sortedCourses.map((course, index) => (
                  <CourseCard
                    key={course.courseCode || course.mangoId || `course-${index}`}
                    course={course}
                    countryCode={countryCode}
                    accentColor={accentColor}
                    borderRadius={cardBorderRadius}
                  />
                ))}
              </div>
            ) : (
              <div className="courses-no-results">
                <p>No courses match your search.</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
