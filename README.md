<div align="center">

# ⚽ FanKit Client

**Wear Your Team. Live The Game.**

A modern e-commerce  sports merchandise — football jerseys, cricket
jerseys, and accessories. Built with React, TypeScript, and Vite.

**Live demo:** [https://fankit-two.vercel.app](https://fankit-two.vercel.app)

</div>

---

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Related Repositories](#related-repositories)

---

## 🧰 Tech Stack

| Layer        | Technology                                             |
| ------------ | ------------------------------------------------------ |
| Framework    | [React 19](https://react.dev) + TypeScript             |
| Build tool   | [Vite 8](https://vite.dev)                             |
| Styling      | [Tailwind CSS v4](https://tailwindcss.com) + daisyUI 5 |
| Routing      | [React Router 8](https://reactrouter.com)              |
| Data fetching| [TanStack Query 5](https://tanstack.com/query)         |
| Animations   | [Framer Motion 12](https://www.framer.com/motion/)     |
| Charts       | [Recharts](https://recharts.org)                       |
| Payments     | [Stripe.js](https://stripe.com)                        |
| Auth         | [Firebase Auth](https://firebase.google.com)           |

---

## ✨ Features

### Public
- **Home** — hero banner, featured categories, new arrivals, best sellers,
  popular teams, testimonials, newsletter
- **Collections / Shop** — filterable product grid with search, category,
  subcategory, type, team, sort, price range, and pagination
- **Product Details** — image gallery, size & quantity selector, tabs,
  reviews, related items
- **About / Contact / Offers** — informational pages

### Authenticated
- Wishlist with one-click save / remove
- Shopping cart with quantity steppers and stock re-validation
- **Checkout** — card payments via Stripe, plus a bKash demo flow
- Order history with status timeline (Pending → Paid → Processing →
  Shipped → Delivered) and tracking numbers
- Profile, settings, password change, and address book

### Admin (`/admin`)
- Dashboard with revenue / order / user statistics
- Product management (create, edit, delete)
- Order management (status + tracking updates)
- User management (role toggles)
- Analytics dashboards
- Store settings

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 20
- A running [FanKit Server](https://github.com/fankit/fankit-server) (default `http://localhost:8000`)

### Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). In development the Vite
server proxies `/api/*` requests to `http://localhost:8000`.

---

## 🔐 Environment Variables

Copy `.env.example` (or your existing `.env`) and fill in the values:

```env
# API base URL — dev only. In production the Vercel rewrite proxies /api/*,
# so this should be left UNSET (see .env.production).
VITE_AUTH_API_URL=http://localhost:8000

# Stripe publishable key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxx

# Firebase Web configuration (Firebase Console → Project settings → General)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

> **Production note:** `.env.production` intentionally omits
> `VITE_AUTH_API_URL`. Leaving it unset makes `apiClient` fall back to
> `window.location.origin`, so all `/api/*` calls go through the Vercel
> rewrite proxy (`vercel.json`) to `https://fankit-server.onrender.com`.
> This keeps cookies first-party and avoids CORS issues.

---

## 📜 Scripts

| Command               | Description                              |
| --------------------- | ---------------------------------------- |
| `npm run dev`         | Start Vite dev server                    |
| `npm run build`       | Type-check (`tsc -b`) + build (`vite build`) |
| `npm run preview`     | Preview the production build             |
| `npm run lint`        | Run ESLint                               |

---

## 📁 Project Structure

```
src/
├── api/          # Typed API modules (cart, orders, products, payments, ...)
├── assets/       # Static images (logo, banners)
├── components/   # Shared + feature components (checkout, admin, shop, ...)
├── hooks/        # TanStack Query hooks (useCart, useOrders, useProducts, ...)
├── layout/       # MainLaout, AdminLayout
├── lib/          # auth-client, stripe, format, validation, orderStatus, ...
├── pages/        # All route components (home, shop, cart, checkout, admin, ...)
├── routes/       # Router definitions + auth guards
├── main.tsx      # Application entry point
└── index.css     # Tailwind / global styles
```

---

## 🚢 Deployment

The client deploys on **Vercel**.

```bash
npm run build
vercel --prod
```

`vercel.json` rewrites:
- `/api/*` → `https://fankit-server.onrender.com/api/*` (API proxy)
- everything else → `/index.html` (SPA fallback)

---

## 🔗 Related Repositories

- **API Server:** [FanKit Server](https://fankit-server.onrender.com) — see the
  server README for API documentation.
- **Project docs:** `summary.txt` and `FLOW.txt` at the repository root cover
  the architecture and end-to-end flows.
