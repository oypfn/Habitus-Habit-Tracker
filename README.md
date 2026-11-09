# Habitus — A calmer way to build better routines

Habitus is a responsive habit-tracking frontend prototype built with React and Vite. It focuses on daily check-ins, transparent progress calculations, and a lightweight reflection journal.

## Current implementation status

This repository currently contains a **client-side prototype**, not a production SaaS product.

Implemented:
- Responsive dashboard, habits, insights, and journal views
- Create habits and record daily completions
- Local-calendar weekly history and completion percentages
- Current streak calculated from recorded dates
- Search habits
- Add journal reflections
- Browser-local persistence
- Export local data as JSON and clear local data
- Help page explaining storage and current limitations
- ESLint, unit tests, production build in GitHub Actions

Not implemented:
- Real user registration, login, password recovery, or account security
- Backend API, hosted database, cross-device synchronization, or cloud backups
- Push notifications, scheduled reminders, or email delivery
- Payments, subscriptions, billing, or a Pro entitlement system
- Production monitoring, analytics consent management, or customer support operations

**Important:** Data is stored in the current browser using localStorage. It is not encrypted by this application, is not synced to a server, and can be lost if browser data is cleared. Do not use this prototype for sensitive personal information.

## Tech stack

- React 19
- Vite 7
- JavaScript (ES modules)
- CSS
- Lucide React
- Node.js built-in test runner

## Requirements

Use Node.js 22 (recommended) or a Vite-supported Node.js release.

## Run locally

1. Clone the repository: `git clone https://github.com/oypfn/Habitus-Habit-Tracker.git`
2. Enter the project: `cd Habitus-Habit-Tracker`
3. Install dependencies: `npm install`
4. Start the dev server: `npm run dev`

Open the local URL printed by Vite.

## Quality checks

- `npm run lint`
- `npm test`
- `npm run build`

GitHub Actions runs these checks for pushes to main and pull requests targeting main.

## Data model

A habit stores its identifier, name, category, goal label, creation date, and an array of local calendar date keys for completed days. Streak and weekly completion figures are derived from those records rather than sample percentages.

## Roadmap before commercial launch

1. Define the target customer, product requirements, and data-retention policy.
2. Build a secure backend and database with per-user authorization.
3. Implement real authentication, password reset, and session management.
4. Add migrations, backups, rate limits, server-side validation, and audit logging.
5. Add integration and end-to-end tests, including accessibility and browser coverage.
6. Complete privacy/legal review (including GDPR obligations where applicable).
7. Configure production hosting, monitoring, error reporting, and incident response.
8. Add billing only after pricing, taxes, cancellation, and support processes are defined.

## License

MIT
