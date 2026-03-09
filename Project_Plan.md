# 1-Month Phase Plan: Perfume Ecommerce & CRM Website

## Overview

This plan outlines a 4-week phased approach to build and launch a perfume ecommerce website with integrated CRM functionality. Total timeline: 30 days. Assumes a small team (1-3 developers, designer, project manager) and pre-approved business requirements from the finalized brand blueprint (see `Brand_Blueprint.md`).

**Key Assumptions:**

- Business & Product Catalog docs are finalized (aligned with blueprint: focus on Extrait de Parfum, Wedding Perfume Bar (more like specific page for inquiries, in the menu bar), bundles for AOV $110+). Informational and Ecommerce focused
- Tech stack: Next.js (frontend), Node.js/Express (backend), MongoDB (database), Square (payments), custom ecommerce build.
- CRM: Separate admin web app for stock management, analytics, customer profiles, and email automation (integrated with main site via real-time sync/webhooks).
- Email: SendGrid (free tier) for customer confirmations and admin notifications.
- Hosting: GoDaddy for frontend/website, free/paid cloud service (e.g., Render/Railway) for backend/CRM to handle stock updates.
- Team availability: Full-time during sprint.
- Scope: Phase 1 MVP as per blueprint (core ecommerce for 30ml/50ml bottles, Wedding enquiry funnel, bundles, compliance, basic email).

**Success Criteria:**

- Live ecommerce site with product catalog, cart, checkout, and Wedding Perfume Bar enquiry form.
- Basic CRM: Customer profiles, order history, email automation for repeat purchases.
- 95% uptime post-launch, <5% bug rate.
- AOV target: $110–$145 via bundle optimization.

---

## Phase 1: Discovery & Planning (Days 1-7)

**Goal:** Lock requirements, architecture, and design direction.

### Day 1-2: Requirements Finalization

- Review and finalize business basics, product catalog standards.
- Define user stories for ecommerce (browse, purchase, account) and CRM (customer management, segmentation).
- Prioritize MVP features vs nice-to-have.
- **Deliverable:** Approved requirements document.
- **Owner:** Project Manager.
- **Risk:** Scope creep; mitigate with change control.

### Day 3-4: Tech Stack & Architecture

- Design custom ecommerce architecture (API endpoints, database schema for products, orders, CRM).
- Plan CRM integration (API keys, data flow).
- Set up development environment (Git repo, CI/CD pipeline).
- **Deliverable:** Tech spec document, environment setup.
- **Owner:** Lead Developer.
- **Risk:** Tech debt; mitigate with code reviews.

### Day 5-7: Design & Wireframes

- Create low-fidelity wireframes for key pages (home, PDP, cart, checkout, CRM dashboard) aligned with UI Kit (warm luxury, minimal elegance).
- Define UI components (buttons, forms, cards) per spec (colors: Champagne Gold, typography: Playfair/Montserrat).
- Gather feedback from client.
- **Deliverable:** Wireframe deck, design system guidelines (see `UI_Kit_Spec.md`).
- **Owner:** Designer.
- **Risk:** Design delays; mitigate with weekly reviews.

**Milestone:** Planning complete, ready to build.

---

## Phase 2: Design & Setup (Days 8-14)

**Goal:** High-fidelity designs and infrastructure setup.

### Day 8-10: High-Fidelity Design

- Develop mockups for all pages using UI Kit specs (e.g., Enquiry Form for Wedding Perfume Bar, product cards with soft cream background).
- Create style guide (colors, typography, icons) based on spec (Champagne Gold, Playfair Display).
- Design CRM interface (admin dashboard, customer views) with minimal elegance.
- **Deliverable:** Full design mockups aligned with `UI_Kit_Spec.md`.
- **Owner:** Designer.
- **Risk:** Client feedback loops; mitigate with clear approval gates.

### Day 11-12: Database & Backend Setup

- Set up database schema (products, users, orders, CRM data).
- Implement authentication (login/signup).
- Configure payment gateway integration.
- **Deliverable:** Database seeded with sample data, basic API endpoints.
- **Owner:** Backend Developer.
- **Risk:** Integration issues; mitigate with sandbox testing.

### Day 13-14: CRM Foundation

- Design separate admin web app architecture for CRM (stock updates, analytics dashboard, customer management).
- Set up database schema for CRM data (customers, orders, enquiries, analytics).
- Plan real-time sync/webhooks from main site to CRM for enquiries and purchases.
- Integrate SendGrid for email confirmations (customer acknowledgments, admin notifications).
- **Deliverable:** CRM app wireframes, data model, initial email setup.
- **Owner:** Developer.
- **Risk:** Data privacy; ensure GDPR compliance.

**Milestone:** Designs approved, infrastructure ready.

---

## Phase 3: Development (Days 15-21)

**Goal:** Build core features.

### Day 15-16: Frontend Core (Ecommerce)

- Build product listing, search, filters (focused on Extrait 30ml/50ml, scent families, bundles).
- Implement product detail page with add-to-cart and Wedding Perfume Bar enquiry form.
- Create cart and checkout flow with bundle pricing optimization.
- **Deliverable:** Functional ecommerce frontend aligned with brand blueprint.
- **Owner:** Frontend Developer.
- **Risk:** Performance issues; optimize images/assets.

### Day 17-18: Backend Integration

- Connect frontend to backend APIs.
- Implement order processing, inventory management.
- Add user accounts and order history.
- **Deliverable:** End-to-end purchase flow.
- **Owner:** Backend Developer.
- **Risk:** API failures; thorough testing.

### Day 19-21: CRM Development

- Build separate admin web app (Next.js) for CRM: stock management interface, analytics dashboard (sales, customer segmentation), enquiry tracking.
- Implement real-time sync/webhooks from ecommerce site to CRM (update on purchases/enquiries).
- Add email automation via SendGrid (customer confirmations, admin alerts, recommendations).
- Integrate CRM with ecommerce (sync customer data, bundle suggestions).
- **Deliverable:** Functional CRM admin app integrated with main site.
- **Owner:** Developer.
- **Risk:** Data sync errors; validate with test data.

**Milestone:** Core features built, ready for testing.

---

## Phase 4: Testing & Launch (Days 22-30)

**Goal:** Quality assurance and go-live.

### Day 22-24: QA Testing

- Unit tests for backend, integration tests for APIs.
- Manual testing: Cross-browser, mobile, checkout flow.
- Test CRM features (data accuracy, email sends).
- Bug fixes and iterations.
- **Deliverable:** Test report, bug-free code.
- **Owner:** QA/Developers.
- **Risk:** Undiscovered bugs; mitigate with user acceptance testing.

### Day 25-26: Content & Data Migration

- Upload product catalog data.
- Migrate any existing customer data to CRM.
- Set up live payment/shipping integrations.
- **Deliverable:** Live data populated.
- **Owner:** Operations/Developers.
- **Risk:** Data errors; backup and validate.

### Day 27-28: Deployment & Staging

- Deploy to staging environment.
- Client UAT (user acceptance testing).
- Performance optimization (load testing).
- **Deliverable:** Staging site approved.
- **Owner:** DevOps/Developer.
- **Risk:** Deployment failures; have rollback plan.

### Day 29-30: Launch & Monitoring

- Go-live deployment.
- Monitor site performance, CRM data flow.
- Send launch communications.
- Post-launch bug fixes.
- **Deliverable:** Live site, initial monitoring report.
- **Owner:** Team.
- **Risk:** Downtime; monitor 24/7 first 48h.

**Milestone:** Site live, phase complete.

---

## Dependencies & Risks

- **Dependencies:** Client approvals on time, third-party API access.
- **Risks:** Team bandwidth, tech issues, scope changes.
- **Mitigation:** Daily stand-ups, risk register, contingency buffer (10% time).

## Budget & Resources

- Estimated cost: $20K–$30K (custom build with full-stack development).
- Team: 2 developers, 1 designer, 1 PM.
- Tools: Figma, GitHub, GoDaddy (hosting), Render/Railway (backend), Stripe.

## Next Steps

- Schedule kickoff meeting to assign roles.
- Set up project tracking (Trello/Jira).
- Begin Phase 1 immediately.

---

_This plan is adaptable; adjust based on actual team size and client feedback._
