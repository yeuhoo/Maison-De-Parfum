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

---

## March 16, 2026 — Update 2

### Product Quick View Modal (`/shop`)

**What was built**

- "Quick View" button on each product card (appears on hover, slides up)
- Clicking opens a centered modal — replaces the previous link to a non-existent `/shop/:id` page

**Modal layout (2-column on desktop, stacked on mobile)**

- **Left panel:** Bottle illustration (scaled up), category label, bestseller badge if applicable
- **Right panel:**
  - Scent notes in gold (`#c9a96e`)
  - Product name (Playfair Display heading)
  - Description paragraph
  - Individual scent note pills (split on `·` delimiter)
  - Price and size
  - Quantity selector (+/− buttons, min 1)
  - **Add to Bag** — adds selected quantity to cart then closes modal
  - "Free shipping on orders over $150" note

**Behaviour**

- Backdrop click or ✕ button closes the modal
- Body scroll locked while modal is open (restored on close)
- AnimatePresence: backdrop fades in/out, panel slides up/down
- `openQuickView()` resets quantity to 1 each time

**Files changed**

- `src/app/(site)/shop/page.tsx` — added `Product` type alias, `quickView` + `qty` state, `openQuickView` / `closeQuickView` handlers, swapped Quick View `<Link>` to `<button>`, added modal JSX at bottom of component

**Commit:** `cf9b8e7` — `feat: add product quick view modal with qty selector and add to bag`

---

## March 16, 2026 — Update 3

### SEO Refactor: Product Detail Pages at `/shop/[id]`

**Motivation**

The quick view modal was replaced with real per-product pages so that every product is individually indexable by search engines.

**What was built**

- **`src/lib/products.ts`** — Single source of truth for all product data. Exports `Product` type, `products[]` array (12 products), and `CATEGORIES[]`. Both the shop listing and product detail pages import from here.

- **`src/app/(site)/shop/[id]/page.tsx`** — Server component with:
  - `generateStaticParams()` — pre-renders all 12 product pages at build time (SSG)
  - `generateMetadata()` — per-product `<title>`, `<meta description>`, and Open Graph tags
  - Passes product + related products (same category, up to 3) to the client component
  - Returns `notFound()` for unknown IDs

- **`src/app/(site)/shop/[id]/ProductDetailClient.tsx`** — "use client" product detail UI:
  - Breadcrumb: Home / Shop / {product name}
  - Left column: bottle illustration (2.4× scale), mood/accent tags, decorative circles
  - Right column: category + size label, `<h1>` product name, description, scent note pills, price, quantity selector, Add to Bag button (shows "Added to Bag ✓" for 2.2s)
  - Product details table: Category, Size, Concentration, Origin
  - Related products section (links to their own `/shop/[id]`)
  - Back to Shop link

**Shop page cleanup**

- Quick View button restored to `<Link href="/shop/${product.id}">` (SEO-friendly)
- Modal JSX, `quickView` state, `qty` state, `openQuickView`/`closeQuickView` handlers all removed
- Inline product data and type definitions removed — now imported from `@/lib/products`

**Build output**

All 28 pages compiled cleanly. All 12 `/shop/[id]` pages statically generated (`● SSG`).

**Files changed**

- `src/lib/products.ts` — new shared data module
- `src/app/(site)/shop/[id]/page.tsx` — new SSG server component
- `src/app/(site)/shop/[id]/ProductDetailClient.tsx` — new product detail UI
- `src/app/(site)/shop/page.tsx` — cleaned up (removed modal, imports from shared lib)

**Commit:** `1bf01d5` — `feat: product detail pages at /shop/[id] for SEO, extract products to shared lib`
