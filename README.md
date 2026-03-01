# Bewakoof — Next.js Web Application

India's boldest fashion brand, built with **Next.js 15 (App Router) + TypeScript**.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Copy env template and fill in values
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Folder Structure

```
src/
├── app/
│   ├── (web)/              # Public website (routes visible at root /)
│   │   ├── layout.tsx      # Web layout: Header + Footer
│   │   ├── page.tsx        # Home page  /
│   │   ├── about/          # /about
│   │   └── contact/        # /contact
│   ├── admin/              # Admin panel  /admin
│   │   ├── layout.tsx      # Admin layout: Sidebar + AdminHeader
│   │   ├── page.tsx        # Redirects to /admin/dashboard
│   │   ├── (auth)/login/   # /admin/login
│   │   └── dashboard/      # /admin/dashboard
│   ├── api/
│   │   └── health/         # GET /api/health
│   ├── layout.tsx          # Root layout (fonts, metadata)
│   ├── globals.css         # Global styles & CSS variables
│   └── not-found.tsx       # 404 page
│
├── components/
│   ├── ui/                 # Generic atoms: Button, Input
│   ├── web/                # Public components: Header, Footer
│   └── admin/              # Admin components: AdminSidebar, AdminHeader
│
├── hooks/                  # Custom hooks (useLocalStorage)
├── lib/                    # Core library: axiosInstance, utils
├── services/               # API layer: authService, productService
├── store/                  # Global state: authStore (Context)
├── types/                  # TypeScript types (User, Product, Order…)
└── constants/              # App-wide constants (ROUTES, STORAGE_KEYS…)
```

---

## 🔗 Path Aliases

Use these instead of relative imports:

| Alias | Resolves to |
|---|---|
| `@/*` | `src/*` |
| `@ui/*` | `src/components/ui/*` |
| `@web/*` | `src/components/web/*` |
| `@admin/*` | `src/components/admin/*` |
| `@hooks/*` | `src/hooks/*` |
| `@lib/*` | `src/lib/*` |
| `@services/*` | `src/services/*` |
| `@store/*` | `src/store/*` |
| `@types/*` | `src/types/*` |
| `@constants/*` | `src/constants/*` |

**Example:**
```ts
import Button from "@ui/Button";
import { authService } from "@services/authService";
import { formatCurrency } from "@lib/utils";
import { ROUTES } from "@constants/index";
```

---

## 🎨 Design System

CSS variables are defined in `src/app/globals.css`:

| Variable | Value |
|---|---|
| `--color-primary` | `#ff5200` (Bewakoof orange) |
| `--color-admin-bg` | `#0f0f1a` (Admin dark) |
| `--color-admin-accent` | `#ffd700` (Admin gold) |
| `--max-width` | `1280px` |

---

## 📦 Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | CSS Modules + Global CSS |
| HTTP | Axios (centralized instance) |
| State | React Context (AuthStore) |

---

## Available Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint check
```
