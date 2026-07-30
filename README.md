# FanKit Client ⚽🏏🧢

Frontend for **FanKit** — an e-commerce platform for sports merchandise. Browse, search, and shop football jerseys, cricket jerseys, and accessories.

**Wear Your Team. Live The Game.**

---

## Tech Stack

- React 19, TypeScript 6, Vite 8
- Tailwind CSS v4, DaisyUI 5
- React Router 8
- TanStack React Query 5
- Better Auth (client)
- Framer Motion 12
- Recharts

---

## Features

### Public
- **Home** — Hero banner, featured categories (Football / Cricket / Accessories), new arrivals, best sellers, popular teams, testimonials, newsletter
- **Collections** — Filterable product grid with search, category, subcategory, team, sort, price range, pagination
- **Product Details** — Image gallery, size selector, quantity, tabs, reviews
- **About / Contact / Blog**

### Authenticated
- Wishlist
- Shopping Cart
- Checkout
- Order History & Tracking
- Profile & Address Management
- Product Reviews

### Admin (`/admin`)
- Dashboard with analytics
- Manage Products (CRUD)
- Manage Orders
- Manage Users
- Analytics (revenue, traffic, category/brand charts)
- Store Settings

---

## Pages

| URL | Page |
|---|---|
| `/` | Homepage |
| `/shop` | Shop landing |
| `/collections` | All products (filtered) |
| `/collections/football` | Football |
| `/collections/cricket` | Cricket |
| `/collections/accessories` | Accessories |
| `/collections/new-arrivals` | New Arrivals |
| `/collections/best-sellers` | Best Sellers |
| `/collections/sale` | Sale items |
| `/collections/:team` | Team collection |
| `/products/:slug` | Product details |
| `/about` | About |
| `/contact` | Contact |
| `/blog` | Blog |
| `/signin` | Sign in |
| `/signup` | Sign up |
| `/profile` | My Profile |
| `/profile/addresses` | My Addresses |
| `/orders` | My Orders |
| `/orders/:id` | Order Detail |
| `/wishlist` | Wishlist |
| `/cart` | Shopping Cart |
| `/checkout` | Checkout |
| `/admin/dashboard` | Admin Dashboard |
| `/admin/products` | Manage Products |
| `/admin/products/new` | Add Product |
| `/admin/products/:id/edit` | Edit Product |
| `/admin/orders` | Manage Orders |
| `/admin/users` | Manage Users |
| `/admin/analytics` | Analytics |
| `/admin/settings` | Settings |

---

## Getting Started

```bash
npm install
npm run dev        # http://localhost:5173
```

### Environment Variables

```env
VITE_AUTH_API_URL=http://localhost:8000
```

### Build

```bash
npm run build      # tsc -b && vite build
npm run preview
```

---

## Project Structure

```
src/
├── api/             # API client layer
├── components/      # Shared & page components
├── hooks/           # TanStack Query hooks
├── layout/          # Main & Admin layouts
├── lib/             # Better Auth client
├── pages/           # All page components
├── routes/          # Router + auth guards
├── main.tsx         # Entry point
└── index.css        # Tailwind
```

---

## Related

- **Server repo:** [FanKit-Server](https://github.com/your-org/fankit-server)
- **Requirements:** See `REQUIREMENTS.md` at project root
