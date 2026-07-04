# Telecom CRM

A full-featured CRM system for managing a telecom operator: subscribers, SIM cards, tariffs, users, and registration requests. A university coursework project with a focus on clean frontend architecture.

**Live demo:** https://kurswork.vercel.app

### Demo credentials

| Role    | Email            | Password    |
|---------|------------------|-------------|
| Admin   | admin@demo.com   | Demo12345   |
| Manager | manager@demo.com | Demo12345   |
| User    | user@demo.com    | Demo12345   |

> Demo data resets automatically every 12 hours.

## Tech Stack

**Frontend:** React 19, TypeScript, Redux Toolkit, React Router, MUI, Recharts, Axios  
**Backend:** ASP.NET Core 8, MongoDB — [separate repository](https://github.com/yarty777-Vdovichenko/kurs_work_back)  
**Testing:** Vitest, React Testing Library

## Features

- JWT authentication — access token in memory, refresh token in httpOnly cookie, automatic silent refresh on 401
- Role-based access control (RBAC): `User`, `Manager`, `Admin` — enforced on both frontend (route guards, conditional rendering) and backend
- Full CRUD for subscribers, SIM cards and tariffs with server-side pagination, search and filtering
- Registration request flow — users submit requests, managers approve or reject them
- Dashboard with live statistics and charts (Recharts)
- Global notification system (Snackbar) and confirmation dialogs replacing native `alert`/`confirm`
- Route-level code splitting via `React.lazy` + `Suspense` for a smaller initial bundle

## Architecture Decisions

A few intentional choices worth knowing before reading the code.

**Redux over Context for auth state.** `accessToken` and `role` are read in many independent places — the axios interceptor, route guards, the header. `useSelector` lets each consumer subscribe to exactly the field it needs, avoiding the re-render cascade that Context causes when any part of the shared value changes. For UI-only state with no such requirement (notifications, confirmations), the lighter Context API was used instead.

**Shell components for forms.** All modals and drawers share the same visual frame — wrapper, Save/Cancel buttons, loading indicator. This is extracted into `ModalShell` / `DrawerShell`. The repeated save logic — checking for changes, try/catch, showing a result notification — lives in `useModalForm` / `useDrawerForm` hooks. An exception was made where unification would have added more complexity than it saved (the SIM edit form has two independent validations that don't fit a single `hasChanges` condition).

**`apiRequest<T>` as a request wrapper.** Every API endpoint repeated the same try/catch block with axios error handling. Extracted into one generic function — each API method is now a single line.

**RTK Query intentionally skipped.** Lists (subscribers, tariffs, users) are built with `useState` / `useEffect`; Redux is used only for auth. This is a deliberate trade-off favouring simplicity and transparency for a coursework project. Migrating to RTK Query is the planned next step.

## Project Structure

```
src/
├── api/            # backend requests, one file per entity
├── Components/     # reusable UI blocks (Shells, cards, filters, FAB)
├── contexts/       # Snackbar Context + Provider
├── hooks/          # form logic, refresh, confirmation dialog
├── Layout_Pages/   # layout wrappers (public / admin area)
├── Pages/          # application pages
├── store/          # Redux: auth slice
└── types/          # shared TypeScript types
```

## Running Locally

```bash
npm install
npm run dev
```

Create a `.env` file with `VITE_API_URL` pointing to the backend.

```bash
npm run test    # run tests
npm run build   # production build
```

## Roadmap

- [ ] Migrate list pages to RTK Query
- [ ] Expand test coverage
- [ ] Dockerise the frontend
