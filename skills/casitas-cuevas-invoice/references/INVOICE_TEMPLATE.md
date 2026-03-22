# Invoice Template Specification

## Purpose
This document defines the structure, behavior, data, and visual layout of the invoice feature for the Casitas Cuevas Invoice Web App. Use this as the source of truth when generating UI components, form logic, and print styles.

---

## Hardcoded Business Info (never editable by user)
```
Business Name : Casitas Cuevas
Address       : Atlanta, GA 30338
Phone         : (XXX) XXX-XXXX
```

---

## Visual Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  INVOICE                          Casitas Cuevas                │
│                                   Atlanta, GA 30338             │
│                                   (XXX) XXX-XXXX                │
├─────────────────────────────────────────────────────────────────┤
│  Bill To:                         Invoice #: 0001               │
│  [Restaurant / Business Name]     Date: 03/22/2026              │
│  [Address Line 1]                 Terms: Due upon receipt       │
│  [Address Line 2]                                               │
├──────────────────────────┬────────┬────────────┬───────────────┤
│  Product                 │  Qty   │ Unit Price │     Total     │
├──────────────────────────┼────────┼────────────┼───────────────┤
│  Flan                    │  2     │  $70.00    │   $140.00     │
│  Tres Leches             │  1     │  $48.00    │    $48.00     │
│  [+ Add Item]            │        │            │               │
├──────────────────────────┴────────┴────────────┼───────────────┤
│                                     Subtotal:  │   $188.00     │
│                                     Tax (%):   │  [optional]   │
│                                     Total:     │   $188.00     │
├─────────────────────────────────────────────────────────────────┤
│  If you have any questions about this invoice,                  │
│  please contact (XXX) XXX-XXXX                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Sections

### 1. Header (top row)
| Field | Value | Editable |
|---|---|---|
| Title | "Invoice" | No |
| Business Name | "Casitas Cuevas" | No |
| Address | "Atlanta, GA 30338" | No |
| Phone | "(XXX) XXX-XXXX" | No |

### 2. Bill To + Invoice Meta (second row, two columns)
**Left column — Bill To:**
| Field | Type | Required | Notes |
|---|---|---|---|
| Business Name | text input | Yes | Name of the restaurant being billed |
| Address Line 1 | text input | Yes | Street address |
| Address Line 2 | text input | No | City, State, ZIP |

**Right column — Invoice Meta:**
| Field | Type | Required | Notes |
|---|---|---|---|
| Invoice # | auto-generated | Yes | Sequential integer, zero-padded (e.g. 0001, 0002). Stored in IndexedDB. Never random. |
| Date | date picker (native) | Yes | Defaults to today. Format displayed as MM/DD/YYYY |
| Terms | text input | Yes | Default value: "Due upon receipt" |

### 3. Items Table (dynamic rows)
| Column | Type | Required | Notes |
|---|---|---|---|
| Product | text input or preset selector | Yes | Free text or selected from preset list |
| Qty | number input | Yes | Supports decimals (e.g. 0.5). Min: 0.01 |
| Unit Price | currency input | Yes | 2 decimal places. Pre-filled if preset is selected |
| Total | calculated, read-only | — | Qty × Unit Price, formatted as currency |

**Item Presets (quick-add buttons):**
Clicking a preset adds a new row with the product name and unit price pre-filled. Qty defaults to 1.
```
[ Flan $70.00 ]  [ 1/2 Flan $35.00 ]  [ Tres Leches $48.00 ]  [ Choco Flan $48.00 ]  [ 1/2 Choco Flan $24.00 ]
```

Preset data:
```json
[
  { "name": "Flan",           "price": 70.00 },
  { "name": "1/2 Flan",       "price": 35.00 },
  { "name": "Tres Leches",    "price": 48.00 },
  { "name": "Choco Flan",     "price": 48.00 },
  { "name": "1/2 Choco Flan", "price": 24.00 }
]
```

**Row controls:**
- Each row has a remove button (trash icon or ✕) to delete it
- "Add Item" button appends a new empty row
- At least 1 item row must exist before saving

### 4. Totals Section (bottom-right, below items table)
| Field | Type | Notes |
|---|---|---|
| Subtotal | calculated, read-only | Sum of all item totals |
| Tax (%) | number input, optional | User enters a percentage. If empty or 0, tax line is hidden on print. Tax amount = Subtotal × (tax% / 100) |
| Total | calculated, read-only | Subtotal + Tax amount |

### 5. Footer
- Static text: `"If you have any questions about this invoice, please contact (XXX) XXX-XXXX"`
- Always shown, not editable by user

---

## Behavior Rules

- **Invoice # generation**: On invoice creation, read the last invoice number from IndexedDB, increment by 1, zero-pad to 4 digits (e.g. `0001`). First invoice starts at `0001`. ( can be turned off or on, ON TOGGLE)
- **Date default**: Always defaults to today's date on new invoice creation.
- **Terms default**: Pre-filled with "Due upon receipt". User can overwrite.
- **Currency formatting**: All prices display with `$` prefix and 2 decimal places.
- **Line total**: Recalculates live as qty or unit price changes.
- **Subtotal / Total**: Recalculate live whenever any item or tax % changes.
- **Empty state**: New invoice starts with 1 empty item row.
- **Tax field**: If tax % is 0 or empty, tax row is hidden in print view.

---

## Print / Export Behavior

- **Print view**: All interactive UI elements are hidden. Inputs render as plain text, date picker as static text. Only the clean invoice is visible.
- **Hidden on print**: Add Item button, preset buttons, remove row buttons, Save button, nav elements.
- **PDF export**: Planned future feature — not in current scope.

---

## Example Invoice (filled in)

```
Invoice                              Casitas Cuevas
                                     Atlanta, GA 30338
                                     (XXX) XXX-XXXX

Bill To:                             Invoice #: 0003
El Ranchero Restaurant               Date: 03/22/2026
456 Peachtree St                     Terms: Due upon receipt
Atlanta, GA 30308

Product             Qty    Unit Price    Total
──────────────────────────────────────────────
Flan                3      $70.00        $210.00
Tres Leches         2      $48.00        $96.00
1/2 Choco Flan      1      $24.00        $24.00
──────────────────────────────────────────────
                           Subtotal:     $330.00
                           Total:        $330.00

If you have any questions about this invoice,
please contact (XXX) XXX-XXXX
```

---

## Out of Scope (do not add unless asked)
- Authentication / login
- Multi-user support
- Server-side storage
- Multi-page invoices
- Discount fields
- Invoice status tracking (paid / unpaid)
- PDF export (planned later, not now)
