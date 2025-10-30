# Prompt for Copilot: Chess Training Itinerary Web App

Build a small web app to generate personalised chess training itineraries for students (starting with my sister), based on weaknesses identified in uploaded report screenshots. The tool must also be reusable for any future student.

## Tech & setup
- Stack: Next.js (App Router) + TypeScript + Tailwind CSS.  
- Data: SQLite via Prisma for simplicity.  
- Auth: lightweight email-less “teacher mode” (local session) for MVP; student profiles are created/edited only by teacher.  
- Pages: `/` (Today), `/students`, `/students/[id]`, `/plan-builder/[id]`, `/library`, `/reports`.

## Core concepts
Define a chess skill taxonomy and task types:
- **Skills (tags):** tactics (pins, forks, trapped pieces, mate nets), calculation (candidate moves, forcing lines, blunder check), endgames (basic mates, rook endings, king+pawn), openings (repertoire recall, mistake hotspots), positional play (weak squares, pawn structure), time management, mindset/tilt control.
- **Task types:** tactic drills, endgame studies, annotated game review, calculation worksheets, opening flashcards, time-management drills (e.g., 3+0/5+5 constraints), puzzle rush/survival, play vs. bot with theme, video/reading assignment, OTB practice.

## Data model
Create Prisma models:

```
Student { id, name, rating?, goals(text), timeBudgetDaily(int mins), timeBudgetWeekly(int mins), schedulePreference(enum: DAILY/WEEKLY), weaknesses(json[] of SkillTag), targets(json of KPIs), createdAt }
TaskTemplate { id, title, skillTags[], durationMins, resourceUrl?, instructions }
PlannedTask { id, studentId, date, templateId?, customTitle, skillTags[], durationMins, status(enum: TODO/DONE/SKIPPED), notes }
ReportFinding { id, studentId, source("screenshot"|"manual"), text, mappedSkills[], severity(1–5), createdAt }
```

## Input (screenshots) flow
- Page to upload 14 screenshots of a chess report. Implement a simple OCR placeholder function (stub) that extracts text; teacher can edit extracted text before saving as `ReportFinding`.  
- A mapping UI lets the teacher tag each finding to one or more skills and set severity.

## Plan builder
- Given `ReportFinding` + `Student` goals/time budgets, generate either a **daily** or **weekly** itinerary (teacher chooses).  
- Scheduling rules:
  1) Prioritise highest-severity weaknesses.  
  2) Mix tasks so no single skill >50% of a day.  
  3) Apply spaced repetition for recurring skills (simple SM-2-style: revisit in 1, 3, 7, 14 days).  
  4) Fit within timeBudgetDaily/Weekly with ±10% tolerance.
- Allow the teacher to regenerate, shuffle, or “lock” individual tasks before publishing.

## Library
Seed a small `TaskTemplate` library (e.g., “20 pinned-piece puzzles on Lichess”, “Rook endgame ladder”, “Calculate 3 candidate moves per position”), editable/extendable.

## Today & Reports
- “Today” page shows the current student’s tasks with checkboxes and quick notes.  
- Reports page: simple charts—completed tasks per skill, time spent vs. budget, moving 7-day trend, and KPI targets (e.g., puzzle rating +X, blunder rate <Y%).

## Reusability
- Teacher can duplicate an existing plan as a template and apply it to another student with adjusted budgets and goals.  
- Export itinerary as PDF and shareable link.

## Accessibility & UX
- Keyboard navigable, high-contrast, descriptive labels.  
- Mobile friendly.

## Acceptance criteria
- I can upload screenshots, map findings to skills, set goals/time budgets, and auto-generate a daily/weekly plan.  
- I can tweak tasks, publish, and mark completion.  
- Progress charts and PDF export work.  
- I can create multiple students and reuse templates.

When ready, I’ll provide 14 screenshots to populate `ReportFinding` and refine templates.
