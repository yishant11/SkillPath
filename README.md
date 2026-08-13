# Skillpath — Learning Platform Landing Page

A modern, responsive learning platform landing page built with React, TypeScript, and Framer Code Component integration.

## 🚀 Features

- **Hero Section:** Value proposition with smooth scrolling CTA to courses.
- **Courses Section:** Dynamic grid rendering courses from live API endpoints.
- **Resilient API Handling:** Independent failure handling using `Promise.allSettled()` for `/course-data` and `/country-code`.
- **Accurate Currency Formatting:**
  - `IN`: `pricePaise / 100` $\rightarrow$ `₹1,999` via `Intl.NumberFormat('en-IN')`
  - `US`: `priceUsdCents / 100` $\rightarrow$ `$39.99` via `Intl.NumberFormat('en-US')`
  - Country failure fallback $\rightarrow$ `Price unavailable`
- **4 UI States:**
  - 🔄 **Loading:** Pure CSS-only shimmer skeleton cards matching course card layout
  - ⚠️ **Error:** Polished error message with `[ Retry ]` button and request cancellation
  - 📭 **Empty:** Friendly zero-state message
  - ✅ **Success:** Responsive 3-2-1 column grid with live search & price sorting
- **Framer Property Controls:**
  - `Accent Color` (`ControlType.Color`)
  - `Card Border Radius` (`ControlType.Number`)
- **Responsive Layout:** Desktop (3 cols) $\rightarrow$ Tablet (2 cols) $\rightarrow$ Mobile (1 col).
- **Zero Animation Bloat:** 100% CSS-only transitions & shimmer (no Framer Motion dependency).

---

## 📁 Architecture

```text
src/
├── components/
│   ├── Hero.jsx / Hero.css                     # Hero section & CTA scroll
│   ├── Footer.jsx / Footer.css                 # Footer navigation & copyright
│   ├── CourseCard.jsx / CourseCard.css         # Single card, currency logic, 2-line clamp, badge
│   ├── CourseSkeleton.jsx / CourseSkeleton.css # Reusable CSS shimmer skeleton card
│   └── CoursesSection.jsx / CoursesSection.css # Fetching, states, search, sort, responsive grid
├── code/
│   └── SkillpathCourses.tsx                    # Framer Code Component entry + Property Controls
├── global.css                                  # Baseline resets & typography
└── main.tsx                                    # Local Vite development entry point
```

---

## 🛠️ Getting Started

### Install Dependencies
```bash
npm install
```

### Run Locally
```bash
npm run dev
```

### Production Build
```bash
npm run build
```
