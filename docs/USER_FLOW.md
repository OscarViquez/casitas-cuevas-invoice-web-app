# User Flow

## Pages

| Page | Route | Description |
|---|---|---|
| Saved Invoices | `/` | Home screen. Lists all saved invoices. |
| Create Invoice | `/new` | Form to create a new invoice. |
| Preview Invoice | `/invoice/preview` | Read-only preview before saving. |
| View Invoice | `/invoice/:id` | View a saved invoice. Option to delete. |
| Settings | `/settings` | App settings — language toggle (English / Español). |

---

## Core Flow: Creating an Invoice

```
[ Home / ]
    → tap "New Invoice"
[ Create Invoice /new ]
    → fill in Bill To, items, date, terms
    → tap "Preview"
[ Preview Invoice /invoice/preview ]
    → review the final invoice
    → tap "Back to Edit" to return and make changes
    → tap "Print" to print
    → tap "Download PDF" (coming soon)
    → tap "Save Invoice" to save
[ Home / ]
    → invoice appears in the saved list
```

---

## Core Flow: Viewing a Saved Invoice

```
[ Home / ]
    → tap a saved invoice card
[ View Invoice /invoice/:id ]
    → read-only view of the invoice
    → tap "Delete" to permanently remove it
    → tap "Print" to reprint
```

---

## Settings Flow

```
[ Settings /settings ]
    → toggle Language between English and Español
```

---

## Navigation

The **Floating Bottom Nav** is always visible (except on print) and provides direct access to:

- **Home** — saved invoices list
- **New Invoice** — jump straight to the create form
- **Settings** — app preferences

---

## Notes for Developers

- **No save on create** — the invoice is not saved until the user explicitly taps "Save Invoice" on the Preview page.
- **Delete is permanent** — there is no undo. Confirm with the user before deleting.
- **Invoice numbers are sequential** — generated from the IndexedDB count, zero-padded to 4 digits (e.g. `0001`). Never random.
- **Print view** — all interactive UI (buttons, inputs, nav) is hidden via `print:hidden`. Only the clean invoice renders.
- **PDF download** — planned future feature, not yet implemented.
- **Language toggle** — planned for Settings page, not yet implemented.
