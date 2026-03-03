# myHero

> My personal portfolio website -- built to showcase projects, skills, and a bit of personality.

**Live demo:** [www.alen.website](https://www.alen.website)

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19, TypeScript 5, Vite 6 |
| Styling | Tailwind CSS 3 |
| State (client) | Zustand 5 |
| State (server) | TanStack React Query 5 |
| Animations | Framer Motion 12 |
| Data Viz | D3.js 7 |
| i18n | i18next + react-i18next |
| Forms | React Hook Form + Zod |
| Routing | React Router 7 |
| Email | Resend |
| HTTP | Axios |

---

## Features

- **Portfolio pages** -- Home, Projects, Skills, Activity, Contact
- **GitHub integration** -- live activity feed pulled from the GitHub API
- **D3 visualizations** -- interactive data-driven graphics
- **Framer Motion animations** -- smooth page transitions and micro-interactions
- **Contact form** -- validated with Zod, powered by Resend
- **Internationalization** -- multi-language support via i18next
- **Responsive design** -- mobile-first with Tailwind CSS

---

## Architecture

The codebase follows **Clean Architecture + MVVM** with a custom **Binder pattern**:

```
ViewModel (brain)  -->  ViewController (face)  -->  bind()
   hooks, state,           pure JSX, zero          HOC that
   domain calls            hooks allowed            wires them
```

Third-party libraries are **strictly isolated** behind adapters in `src/lib/`, and all business logic lives in `src/domain/`.

```text
src/
├── app/           # Config, providers, app entry
├── i18n/          # Internationalization config & locales
├── hooks/         # Shared generic hooks
├── lib/           # 3rd-party adapters (axios, react-query, zod...)
├── domain/        # Core business rules, repositories, services
├── store/         # Zustand slices (client state)
├── components/    # Shared reusable UI components
├── layouts/       # Page layouts (MainLayout, etc.)
├── pages/         # MVVM page modules
├── router/        # Route config & path constants
├── styles/        # Tailwind entry point
├── utils/         # Utilities incl. the bind() HOC
└── main.tsx
```

Full architectural rules are documented in [`AGENTS.md`](./AGENTS.md).

---

## Getting Started

### Prerequisites

- **Node.js** >= 20
- **pnpm** >= 10

### Install & Run

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

The app will be available at `http://localhost:5173`.

---

## Environment Variables

Create a `.env.local` file at the project root (or pull from Vercel with `pnpm env:pull`):

| Variable | Description | Example |
|---|---|---|
| `VITE_APP_NAME` | Application display name | `myHero` |
| `VITE_API_URL` | Base API URL | `https://api.example.com` |
| `VITE_ENV` | Environment identifier (`development` / `production`) | `development` |
| `VITE_GITHUB_USERNAME` | GitHub username for activity feed | `JaMingLI` |
| `VITE_GITHUB_TOKEN` | GitHub personal access token (for API rate limits) | `ghp_...` |

---

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Start local dev server |
| `pnpm dev:full` | Start via Vercel CLI (includes serverless functions) |
| `pnpm build` | Type-check + production build |
| `pnpm preview` | Preview the production build locally |
| `pnpm test` | Run tests with Vitest |
| `pnpm test:ui` | Run tests with Vitest UI |
| `pnpm test:coverage` | Run tests with coverage report |
| `pnpm lint` | Lint with ESLint |
| `pnpm release` | Build & deploy to production on Vercel |
| `pnpm release:dev` | Build & deploy to dev preview on Vercel |

---

## Deployment

The site is deployed on **Vercel**. The `vercel.json` rewrites all non-API routes to `index.html` for client-side routing.

```bash
# Production deploy
pnpm release

# Preview deploy
pnpm release:dev
```

---

## License

MIT
