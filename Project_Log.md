# Project Log: Maison De Parfum Website

## March 9, 2026

- Reviewed UI Kit specifications and confirmed fonts (Playfair Display, Montserrat) and color palette.
- Discussed tech stack: Next.js frontend, Node.js/Express backend, MongoDB database, Square payments, SendGrid for emails.
- Clarified CRM as separate admin web app for stock management and analytics.
- Confirmed real-time sync/webhooks for enquiries and purchases to CRM.
- Updated Project Plan to reflect CRM as separate app, email integration, and sync features.

---

## March 16, 2026

### Site Pages Completed

**Home (`/`)**

- Hero section with animated headline and CTA
- Featured products grid (3 bestsellers)
- About strip with brand philosophy
- Editorial CTA banner

**Shop (`/shop`)**

- 12 products across 4 scent categories: Floral, Woody, Oriental, Fresh
- Sticky filter bar with animated gold active underline (`layoutId`)
- Live search bar — queries name, notes, description, category
- Product cards with Add to Bag button wired to cart
- Empty state when search returns no results
- AnimatePresence grid transitions

**About (`/about`)**

- Hero with brand tagline
- Founder story section (placeholder text)
- Mission statement block
- 4 brand values grid (from Brand Blueprint)
- 3 team role cards (placeholder)
- CTA banner

**Contact (`/contact`)**

- 2-column layout: contact info + enquiry form
- Form fields: Name, Email, Subject (dropdown), Message
- Client-side success state after submission
- Social handles strip at bottom

**Perfume Bar (`/perfume-bar`)**

- Hero section
- 3 experience sections
- FAQ accordion
- Enquiry CTA

---

### Cart System

**`src/context/CartContext.tsx`**

- React Context providing: `items`, `count`, `total`, `drawerOpen`, `openDrawer`, `closeDrawer`
- Functions: `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`
- `addToCart` automatically opens the cart drawer

**`src/components/CartDrawer.tsx`**

- Slide-in panel from the right (AnimatePresence)
- Backdrop overlay, Escape key close, body scroll lock
- Item rows: quantity +/− controls, remove button, per-item price
- Footer: subtotal + "Proceed to Checkout" CTA → `/checkout`
- Empty state with Continue Shopping button

**`src/components/Header.tsx`**

- Cart icon is a button that calls `openDrawer()`
- Live badge count (hidden when 0, shows "9+" when over 9)
- Mobile menu "Bag (N)" also opens drawer

---

### App Structure (Route Groups)

Restructured to Next.js App Router route groups for isolated layouts:

```
src/app/
  layout.tsx            ← Root: fonts + globals only (bare)
  (site)/
    layout.tsx          ← Site chrome: CartProvider, Header, CartDrawer, PageTransition, Footer
    page.tsx            ← Home
    shop/page.tsx
    about/page.tsx
    contact/page.tsx
    perfume-bar/page.tsx
  admin/
    layout.tsx          ← Admin chrome: auth gate + dark sidebar (no site header/footer)
    dashboard/page.tsx
    products/page.tsx
    orders/page.tsx
    enquiries/page.tsx
```

---

### CRM Admin (`/admin/*`)

**Access**

- URL: `/admin/dashboard`
- Default password: `admin2024`
- Set `NEXT_PUBLIC_ADMIN_PASSWORD` in `.env.local` to override
- Auth stored in `sessionStorage` — clears on browser close

**Admin Layout (`src/app/admin/layout.tsx`)**

- Login screen: dark `#0c0c0c` background, password input, brand lockup
- Sidebar: `#111111` matte black, gold active state (`#c9a96e`), `220px` wide
- Nav items: Dashboard, Products, Orders, Enquiries
- Coming soon (disabled): Customers, Analytics, Settings
- Log out button clears session

**Dashboard (`/admin/dashboard`)**

- 4 stat cards: Total Products (live), Orders MTD, New Enquiries, Revenue (placeholder — backend pending)
- Recent orders table with placeholder data
- Quick links to other admin sections
- Backend status notice

**Products (`/admin/products`)**

- Table of all 12 products (name, category, notes, price, size, bestseller)
- Category filter + search bar
- Add Product: modal form with name, category, size, notes, price, bestseller toggle
- Edit Product: pre-populated modal
- Delete: confirmation dialog
- State is local (in-memory) — will sync to backend when integrated

**Orders (`/admin/orders`)**

- Orders table with status badges: Pending, Processing, Shipped, Delivered, Cancelled
- Status filter tabs with live counts
- Search by customer name or order ID
- Inline status update via dropdown
- Row expand for full order detail
- Sample placeholder data — will populate from backend

**Enquiries (`/admin/enquiries`)**

- Perfume Bar enquiry table: ID, name, email, event type, date, guest count, status
- Status workflow: New → Reviewed → Replied → Archived
- Filter tabs + search
- Click row to open detail slide-in panel
- Sample placeholder data — will populate from Contact form backend

---

### Privacy / Indexing

- `/admin/*` is not linked anywhere on the public site
- To block search engines, add to `public/robots.txt`:
  ```
  User-agent: *
  Disallow: /admin/
  ```
- For production: use Vercel Password Protection or deploy admin as a separate private app

---

### Tech Stack

| Layer     | Technology                                       |
| --------- | ------------------------------------------------ |
| Framework | Next.js 16 (App Router, Turbopack)               |
| Language  | TypeScript                                       |
| Styling   | Tailwind CSS v4                                  |
| Animation | Framer Motion                                    |
| Fonts     | Playfair Display + Montserrat (Google Fonts)     |
| State     | React Context (cart)                             |
| Repo      | `https://github.com/yeuhoo/Maison-De-Parfum.git` |

---

### Pending (Next Phase)

- [ ] Backend: Node.js/Express + MongoDB
- [ ] Real product images
- [ ] Checkout flow (`/checkout`)
- [ ] Square payment integration
- [ ] SendGrid email confirmations
- [ ] Contact/enquiry form → backend → CRM sync
- [ ] CRM: Customers and Analytics pages
- [ ] Auth upgrade (JWT / NextAuth) for production admin
