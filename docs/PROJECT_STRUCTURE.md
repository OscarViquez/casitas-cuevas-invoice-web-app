# Project Structure

## Overview

Casitas Cuevas Invoice App is a local-first React Router v7 web app for creating, previewing, and printing invoices. No backend, no authentication — all data lives in the browser via IndexedDB.

---

## Folder Structure

```
app/
├── layouts/                  # Shared page wrappers
│   └── AppLayout.tsx         # Header + Floating Bottom Nav
│
├── components/
│   ├── invoice/              # Invoice-specific components
│   │   └── InvoiceForm.tsx   # Full invoice form with items, presets, and totals
│   └── ui/                   # Generic reusable UI primitives (future)
│
├── routes/                   # One file per page
│   ├── home.tsx              # Saved Invoices list (/)
│   ├── invoice.new.tsx       # Create Invoice (/new)
│   ├── invoice.preview.tsx   # Preview Invoice (/invoice/preview)
│   ├── invoice.$id.tsx       # View / Delete Invoice (/invoice/:id)
│   └── settings.tsx          # Settings (/settings)
│
├── lib/                      # Shared utilities
│   ├── constants.ts          # Hardcoded business info + item presets
│   ├── types.ts              # TypeScript interfaces (Invoice, InvoiceItem, etc.)
│   └── db.ts                 # IndexedDB helpers via idb
│
├── app.css                   # Tailwind + reusable component classes
├── root.tsx                  # Root HTML layout + error boundary
└── routes.ts                 # Route config (React Router v7)
```

---

## Reusable Component Classes

Defined in `app/app.css` using Tailwind's `@layer components`. Use these classes directly in HTML/JSX instead of repeating utility strings.

| Class | Usage |
|---|---|
| `.button-primary` | Primary action button (black background) |
| `.button-secondary` | Secondary/outlined button |
| `.card` | White bordered card container |
| `.accordion` | Collapsible section using native `<details>` / `<summary>` |

**Example:**
```html
<button class="button-primary">Save Invoice</button>

<details class="accordion">
  <summary>Order Details</summary>
  <p>Content here</p>
</details>
```

---

## Shared Layout

All routes are wrapped by `AppLayout.tsx` which provides:

- **Header** — displays the business name at the top of every page
- **Floating Bottom Nav** — fixed navigation bar with links to Home, New Invoice, and Settings. Hidden on print.

---

## Key Libraries

| Library | Purpose |
|---|---|
| `react-router` v7 | Routing, SSR, loaders/actions |
| `react-hook-form` | Form state and validation |
| `idb` | IndexedDB wrapper for local invoice storage |
| `tailwindcss` | Utility-first styling |

---

## Adding a New Page

1. Create a file in `app/routes/` (e.g. `my-page.tsx`)
2. Add a route entry in `app/routes.ts` inside the `layout()` block
3. The page will automatically inherit the shared header and bottom nav

```ts
// app/routes.ts
layout("layouts/AppLayout.tsx", [
  // ...existing routes
  route("my-page", "routes/my-page.tsx"),
])
```
