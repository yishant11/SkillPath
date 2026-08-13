# **AI USAGE DISCLOSURE**

* **AI TOOL USED: GOOGLE ANTIGRAVITY CODE EDITOR (AGENT)**
* **THE DEVELOPMENT AND CODE-ASSISTANCE WORK FOR THIS ASSIGNMENT WAS DONE USING ANTIGRAVITY'S AI AGENT.**
* **ANTIGRAVITY DOES NOT PROVIDE A SHAREABLE PUBLIC CHAT LINK IN MY CURRENT SETUP; THE CHAT MENU ONLY PROVIDES AN EXPORT OPTION.**
* **THEREFORE, INSTEAD OF A CHAT SHARE LINK, I AM PROVIDING THE EXACT PROMPTS I USED DURING DEVELOPMENT IN THIS FILE.**
* **I REVIEWED, MODIFIED, TESTED, AND VERIFIED THE GENERATED CODE MYSELF.**
* **I UNDERSTAND THE IMPLEMENTATION AND CAN EXPLAIN THE CODE AND DESIGN DECISIONS DURING THE TECHNICAL REVIEW.**

---

# AI Development Prompt

I am a junior frontend developer completing a Framer technical assessment for a learning platform called Skillpath.

Please help me implement the assignment as a clean, simple and reusable React application.

Do not over-engineer the solution. I want an architecture that is easy for a junior developer to understand and explain during an interview.

## Required Structure

Use this structure:

```text
src/
├── components/
│   ├── Hero.jsx
│   ├── Hero.css
│   ├── Footer.jsx
│   ├── Footer.css
│   ├── CourseCard.jsx
│   ├── CourseCard.css
│   ├── CourseSkeleton.jsx
│   ├── CourseSkeleton.css
│   ├── CoursesSection.jsx
│   └── CoursesSection.css
│
├── code/
│   └── SkillpathCourses.tsx
│
└── global.css
```

Avoid unnecessary folders such as `hooks/`, `services/`, `utils/`, `contexts/`, or `providers/` unless there is a strong reason.

This is a junior developer assessment, so keep the architecture simple, readable and maintainable.

## Main Page

Build a landing page called **Skillpath** containing:

1. Hero
2. Courses section
3. Footer

The courses section is the main focus of the assessment.

## API

Base URL:

```text
https://syncsphere-hiv6.onrender.com
```

Courses endpoint:

```text
GET /assignment/course-data
```

Country endpoint:

```text
GET /assignment/country-code
```

Do not hardcode course data.

The number of courses is dynamic and can change between requests.

## Course Data

Each course contains:

* `courseName`
* `courseCode`
* `description`
* `mainCategory`
* `shortCourse`
* `courseType`
* `pricePaise`
* `priceUsdCents`
* `mangoId`
* `refundable`

Each course card should show:

* Course name
* Description limited to two lines
* Correct price
* `mainCategory`
* Refundable badge when `refundable === true`

## Currency

When:

```text
country_code === "IN"
```

use:

```text
pricePaise / 100
```

Example:

```text
199900 -> ₹1,999
```

When:

```text
country_code === "US"
```

use:

```text
priceUsdCents / 100
```

Example:

```text
3999 -> $39.99
```

Never display raw paise or cents values.

Use proper currency formatting.

## API Failure Handling

The API intentionally fails sometimes with 404 or 500 responses.

Handle these states properly:

1. Loading
2. Success
3. Error
4. Empty result

Do not show a blank page or raw JavaScript errors.

Use a Retry button when appropriate.

The two API requests must be handled independently.

If courses succeed but country fails:

* still show the courses
* do not guess the currency
* display `Price unavailable`

If the courses request fails:

* show a friendly error
* provide Retry

If courses return an empty array:

Display:

```text
No courses available right now.
```

## Loading UI

Use reusable skeleton cards with a CSS-only shimmer animation.

Do not use a spinner.

Do not use Framer Motion.

The skeleton should visually resemble the final course cards.

The loading state should be polished and responsive.

## Responsive Design

Desktop:

```text
3 columns
```

Tablet:

```text
2 columns
```

Mobile:

```text
1 column
```

Use CSS Grid and ensure the layout works with any number of returned courses.

## Framer Code Component

`SkillpathCourses.tsx` should be the Framer Code Component entry point.

It should:

* compose Hero, CoursesSection and Footer
* expose exactly two Framer property controls

Property controls:

1. Accent Color
2. Card Border Radius

Both controls must actually affect the UI.

Do not keep a huge CSS string inside `SkillpathCourses.tsx`.

## CSS Structure

Use component-specific CSS files.

`global.css` should only contain truly global styles such as:

* box-sizing
* body reset
* default font
* basic global element rules

Hero styles belong in:

```text
Hero.css
```

Footer styles belong in:

```text
Footer.css
```

Course card styles belong in:

```text
CourseCard.css
```

Shimmer styles belong in:

```text
CourseSkeleton.css
```

Courses section, grid, search, sorting, error and empty state styles belong in:

```text
CoursesSection.css
```

Do not put hundreds of lines of CSS into the Framer entry component.

## UI

Keep the design clean and modern.

Use:

* readable typography
* consistent spacing
* subtle borders
* subtle shadows
* professional colors
* responsive layouts

Avoid excessive gradients and unnecessary animations.

## Optional Features

After completing all required functionality, optionally add:

* Search
* Sort by price
* Refundable badge
* Retry button

Do not sacrifice core functionality for bonus features.

## Engineering Quality

Use:

* reusable components
* clear responsibilities
* readable names
* minimal duplication
* defensive API handling
* proper `response.ok` checks
* basic response validation
* AbortController where useful
* clean React state management

Avoid:

* giant components
* unnecessary abstractions
* unnecessary dependencies
* duplicated API logic
* unnecessary `useMemo`/`useCallback`

## Testing

Before considering the project complete, verify:

* successful API response
* failed courses API
* failed country API
* both APIs failing
* empty course response
* Retry
* INR pricing
* USD pricing
* shimmer loading
* responsive desktop/tablet/mobile layout
* property controls
* search/sort if implemented
* no console errors
* no build errors

## Final Architecture

The intended architecture should remain simple:

```text
SkillpathCourses.tsx
        ↓
Hero
CoursesSection
Footer

CoursesSection
        ↓
CourseCard
CourseSkeleton
```

The goal is not enterprise-level architecture.

The goal is clean, reusable and understandable code suitable for a junior developer assessment.

## Final Review

After implementation:

1. Inspect the full project.
2. Check for unused files and imports.
3. Check for duplicate implementations.
4. Check for build errors.
5. Check for console errors.
6. Verify responsive behavior.
7. Verify API failure handling.
8. Verify currency conversion.
9. Verify Framer property controls.
10. Verify the final code is easy to explain.

At the end, provide:

1. Files changed
2. Final architecture
3. Important engineering decisions
4. Tests performed
5. Known limitations
6. Any improvements you recommend before submission

Do not claim that something was tested unless it was actually tested.
