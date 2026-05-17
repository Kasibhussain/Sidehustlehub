# Gig & Task Marketplace — Feature Set

Structured product backlog for SideHustleHub. Status reflects the **current demo** (in-memory `jobsStore` + Clerk auth). A **database and payments** are still out of scope here; see [README](../README.md).

| Legend | Meaning |
|--------|---------|
| ✅ | In app today (demo) |
| 🔲 | Not started or needs real persistence |

---

## Demo milestone (current app)

| Area | Highlights |
|------|------------|
| Listings | Jobs with categories, subcategories, fixed/hourly/**offer** pay, optional deadline, urgency, one-off vs ongoing |
| Services | Seller listings with category, subcategory, price |
| Discovery | Job search + filters; **sort** (newest, budget high/low, deadline soon); service search + category/subcategory |
| Applications | Apply with message, optional quote, optional **contact line** for poster; poster sees applications, accept/reject |
| Poster tools | Edit **open** jobs, close listings, dashboard |
| Worker tools | **Saved jobs**, **withdraw** pending application (can apply again), dashboard |
| Home | **Live snapshot** of newest open jobs and services from the store |

---

## Core listings

| Feature | Status | Notes |
|--------|--------|--------|
| Post job/task with title & description | ✅ | `/jobs/new` |
| Budget (fixed / hourly) | ✅ | `Job.payType`, `payAmount` |
| Budget range | ✅ | `payAmount` + `payAmountMax` |
| **Make an offer** pricing mode | ✅ | `PayType` `offer` + required quote on apply |
| Deadline on listings | ✅ | `deadlineAt` |
| **Service listings** | ✅ | `Service` + `/services` |
| Categories | ✅ | `JOB_CATEGORIES` |
| **Subcategories** | ✅ | `subcategory` on jobs & services |
| **One-off vs recurring** work | ✅ | `engagementType` |

---

## Poster (buyer) side

| Feature | Status | Notes |
|--------|--------|--------|
| Create & publish posts | ✅ | Server actions + store |
| Edit open listings | ✅ | `/jobs/[id]/edit` |
| Budget range / bids | 🔲 | Structured bids + counters (beyond single application amount) |
| Compare profiles, ratings, past work | 🔲 | Profiles + reviews |
| Accept / decline offers | ✅ | Accept/reject application |
| Milestone-based payment release | 🔲 | Payments + milestones |
| Re-hire previous workers | 🔲 | Relationships / history |
| Urgency flag (ASAP vs flexible) | ✅ | `urgency` on `Job` |

---

## Worker (seller) side

| Feature | Status | Notes |
|--------|--------|--------|
| Public profile (bio, skills, photo, location) | ✅ | In-memory profiles + `/profile` |
| Portfolio / gallery | ✅ | URLs on profile (no upload) |
| Availability & service radius | ✅ | Profile fields |
| Bid on jobs / apply | ✅ | Application + optional **contact line** for poster |
| Fixed-price **service** listings | ✅ | `/services/new` |
| **Save jobs** | ✅ | Shortlist on `/jobs`, list on dashboard |
| **Withdraw** application | ✅ | Pending only; can re-apply |
| Earnings & payout history | 🔲 | Stripe Connect / ledger |
| Response & acceptance rate stats | 🔲 | Derived metrics |

---

## Matching & discovery

| Feature | Status | Notes |
|--------|--------|--------|
| Search & filter | ✅ | Category, subcategory, text search, urgency, engagement, pay type |
| **Sort jobs** | ✅ | Newest, budget high/low, deadline soon |
| Filter by rating, availability | 🔲 | After data model |
| Geolocation / radius / map | 🔲 | PostGIS or lat/lng + Haversine |
| Workers near you | 🔲 | Geo queries |
| Recommended jobs by skills | 🔲 | Matching service |

---

## Messaging & coordination

| Feature | Status | Notes |
|--------|--------|--------|
| In-platform chat | 🔲 | Stream, Ably, Supabase Realtime, etc. |
| File/image sharing | 🔲 | Object storage + signed URLs |
| Read receipts & typing | 🔲 | Realtime channel features |
| Intro message templates | 🔲 | User prefs / canned messages |
| Optional **contact hint** on application | ✅ | One line visible to poster only |

---

## Trust & safety

| Feature | Status | Notes |
|--------|--------|--------|
| Two-sided ratings & reviews | 🔲 | Post-completion reviews |
| ID verification (workers) | 🔲 | Clerk verification / Persona |
| Background checks (optional / category) | 🔲 | Third-party |
| Report & dispute | 🔲 | `reports` + admin queue |
| Scam / fraud signals on listings | 🔲 | Rules + ML (later) |

---

## Payments

| Feature | Status | Notes |
|--------|--------|--------|
| Escrow until complete | 🔲 | Stripe Connect / similar |
| Milestone releases | 🔲 | Tied to job phases |
| Payouts (Stripe / PayPal / bank) | 🔲 | Region-dependent |
| Tipping | 🔲 | Extra line items |
| Refunds & disputes | 🔲 | Workflow + admin |
| Platform fee (%) | 🔲 | Config + application at capture |
| VAT / tax by region | 🔲 | Compliance layer |

---

## Reviews & reputation

| Feature | Status | Notes |
|--------|--------|--------|
| Star + written review | 🔲 | After verified completion |
| Verified reviews only | 🔲 | Link to payment/settlement |
| Reply to reviews | 🔲 | Thread or public response |
| Badges (Top Rated, Fast Responder, Verified ID) | 🔲 | Rules engine |
| Levels / tiers from completed jobs | 🔲 | Gamification |

---

## Notifications

| Feature | Status | Notes |
|--------|--------|--------|
| New bid / proposal | 🔲 | Email + in-app |
| Job awarded | 🔲 | — |
| Payment released | 🔲 | — |
| New message | 🔲 | — |
| Deadline reminder | 🔲 | Cron / queue |

---

## Admin / platform ops

| Feature | Status | Notes |
|--------|--------|--------|
| Dispute mediation | 🔲 | Admin UI |
| Moderation queue (flagged listings/users) | 🔲 | — |
| Fee & commission config | 🔲 | Settings store |
| Category & tag management | 🔲 | Replace hard-coded lists |
| Health metrics (GMV, completion, disputes, churn) | 🔲 | Analytics / BI |

---

## Compliance

| Feature | Status | Notes |
|--------|--------|--------|
| GDPR / data deletion | 🔲 | DSR process + retention |
| Worker classification / regional notices | 🔲 | Legal content + locale |
| Terms enforcement tooling | 🔲 | Audits + bans |

---

## Suggested build order (technical)

1. **Persistence** — Replace in-memory `jobsStore` with a database (e.g. Supabase); keep the same UX flows.
2. **Bidding & negotiation** — Richer proposals, counters, threading.
3. **Messaging** — After jobs can be “awarded,” add threads per job.
4. **Payments** — Stripe Connect (or regional equivalent) before escrow.
5. **Search & geo** — Full-text + lat/lng indexes.
6. **Trust & admin** — Reviews, reports, disputes, badges.

This document can be sliced into epics/issues per section as implementation starts.
