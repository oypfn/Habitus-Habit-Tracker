# Architecture notes

## Current frontend prototype

- `src/main.jsx` mounts the React application.
- `src/App.jsx` contains the current dashboard, habit interactions, insights and journal prototype.
- `src/App.css` contains the product-specific visual system and responsive layout.
- `src/index.css` contains global resets and focus styles.
- `localStorage` is used only to persist prototype data in the current browser.

## Planned production architecture

The next implementation phase should separate the UI into feature modules and introduce a typed API boundary before adding persistence.

Proposed modules:

- `features/habits`: habit definitions, schedules, check-ins and streak calculations.
- `features/insights`: date-range aggregation and completion trends.
- `features/journal`: private user reflections.
- `features/auth`: registration, login, session lifecycle and account recovery.
- `shared/ui`: reusable accessible controls and layout primitives.
- `shared/lib`: date utilities, validation and API client.

Proposed backend:

- Node.js + TypeScript + Express
- PostgreSQL with migrations
- Zod request validation
- Session-based authentication using secure, HTTP-only cookies
- Automated unit, integration and end-to-end tests

## Data integrity rules

- Store timestamps in UTC; render dates in the user's selected timezone.
- A habit check-in is unique per habit and local calendar date.
- Streaks are calculated from scheduled days, not from calendar days indiscriminately.
- Journal entries are private to their owner.
- Never store passwords in plaintext or place secrets in the frontend bundle.

These are implementation decisions for the planned backend, not claims about features already shipped.
