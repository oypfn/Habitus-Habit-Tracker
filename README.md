# Habitus — A calmer way to build better routines

Habitus is a habit-tracking web application built around a simple idea: consistency should feel clear, not complicated.

The interface uses an understated editorial visual language: warm neutral surfaces, forest-green accents, generous spacing and restrained typography. Its information hierarchy is inspired by established productivity products, while the implementation and visual identity are original.

## Current status

**Phase 1 — Interactive frontend prototype**

- Daily dashboard with completion progress and streak summary
- Habit list with daily check-ins and weekly rhythm
- Add-habit flow with categories
- Search and filter habits
- Insights view with weekly consistency chart
- Reflection journal with add-entry flow
- Local persistence using browser localStorage
- Responsive layout for desktop, tablet and mobile

> This version is a frontend prototype. Authentication, a shared database, reminders and a production API are not implemented yet. Demo content is stored in the browser where the app is opened.

## Product roadmap

1. **Product foundation:** design system, responsive dashboard and accessible interactions.
2. **Persistence and accounts:** REST API, PostgreSQL, authentication, user-owned habits and logs.
3. **Tracking engine:** flexible schedules, measurable goals, streak rules and calendar history.
4. **Insights:** date-range filters, completion trends, category breakdowns and export.
5. **Quality:** unit and integration tests, end-to-end flows, CI, security review and deployment.

## Tech stack

- React 19
- Vite 7
- JavaScript (current prototype)
- Responsive CSS
- Lucide icons
- Browser localStorage for prototype persistence

## Run locally

Requirements: Node.js 20.19+ or 22.12+.

```bash
git clone https://github.com/oypfn/Habitus-Habit-Tracker.git
cd Habitus-Habit-Tracker
npm install
npm run dev
```

Open the local URL printed by Vite.

## Build

```bash
npm run build
npm run preview
```

## Design principles

- Quiet, editorial visual language rather than generic gradient-heavy dashboards
- Warm neutral surfaces, forest-green accents and restrained typography
- Clear hierarchy: today's action first, long-term analysis second
- Useful empty states and direct interactions
- Mobile layouts designed intentionally, not just squeezed desktop views

## License

MIT
