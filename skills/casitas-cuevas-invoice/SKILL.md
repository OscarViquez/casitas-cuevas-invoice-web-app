---
name: casitas-cuevas-invoice
description: Context, business requirements, and technical stack for the Casitas Cuevas Invoice Web App. Use this skill whenever working on this project to understand the business domain, invoice structure, and implementation decisions.
metadata:
  business: Casitas Cuevas
  type: poc
  version: "1.0"
---

# Casitas Cuevas Invoice Web App

## Business Context

**Casitas Cuevas** is a small food business based in Atlanta, GA that sells dessert products (Flan, Tres Leches, Choco Flan, etc.) to local restaurants. They need a simple invoice tool to create, print, and email invoices to their restaurant clients.

**Hardcoded business info (never prompt user to change these):**
- Name: Casitas Cuevas
- Address: Atlanta, GA 30338
- Phone: (678) 592-2547

## Goal

A POC (proof of concept) invoice web app that allows the business to:
1. Create invoices for restaurant clients
2. Save invoices locally (no server, no login)
3. Print clean invoices
4. Email invoices (future)

## Technical Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | React Router v7 (framework mode) | SSR enabled, file-based routing, loaders/actions |
| Runtime | React 19 | Comes with RR7 template |
| Build | Vite 5 | Lightweight, fast |
| Styling | Tailwind CSS 3 | Utility-first, fast iteration |
| Forms | React Hook Form | Clean form handling |
| State | Zustand | Local/IndexedDB UI state |
| Storage | IndexedDB via `idb` | Local-first, no server needed |
| Email | EmailJS or Resend | TBD |
| Language | TypeScript 5.7, strict mode | Path alias `~/*` → `./app/*` |
| Deployment | Vercel | Preset configured |

## Project Structure (React Router v7)

- `app/routes.ts` — route config
- `app/root.tsx` — root layout
- `app/routes/` — page components
- `app/app.css` — global Tailwind styles
- Path alias: `~/*` maps to `./app/*`

## Key Decisions

- **No authentication** — single user, local only
- **No server-side storage** — IndexedDB only
- **No tax by default** — optional editable tax % field on invoice
- **No randomized IDs** — invoice numbers are sequential integers, zero-padded (0001, 0002...)
- **RR7 loaders/actions** handle data flow; Zustand scoped to local UI state and IndexedDB
- **Zustand not needed for server data** — no server fetching, TanStack Query not needed
- **PWA**: TBD — may conflict with RR7 SSR; evaluate later

## Invoice Structure

See the full invoice specification in [references/INVOICE_TEMPLATE.md](references/INVOICE_TEMPLATE.md).

**Summary:**
- Header: hardcoded business info + "Invoice" title
- Bill To: restaurant name, address (2 lines)
- Invoice meta: auto-incremented invoice #, date (default today), terms (default "Due upon receipt")
- Items table: dynamic rows with preset quick-add buttons
- Totals: subtotal, optional tax %, total
- Footer: static contact message

**Product presets (quick-add):**
| Product | Price |
|---|---|
| Flan | $70.00 |
| 1/2 Flan | $35.00 |
| Tres Leches | $48.00 |
| Choco Flan | $48.00 |
| 1/2 Choco Flan | $24.00 |

## Out of Scope

Do not add these unless explicitly asked:
- Authentication or login
- Multi-user support
- Server-side storage or database
- Multi-page invoices
- Discount fields
- Invoice status tracking (paid/unpaid)
- PDF export (planned later)
- Tax calculation by default
