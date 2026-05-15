# Gig & Task Marketplace — Feature Set

Structured product backlog for SideHustleHub. Implementation status is tracked against the **current scaffold** (see [README](../README.md)).

| Legend | Meaning |
|--------|---------|
| ✅ | In app today (scaffold) |
| 🔲 | Not started |

---

## Core listings

| Feature | Status | Notes |
|--------|--------|--------|
| Post job/task with title & description | ✅ | `/jobs/new` |
| Budget (fixed / hourly) | ✅ | `Job.payType`, `payAmount` |
| Budget range & invite bids | 🔲 | Extend model + UI |
| **Make an offer** pricing mode | 🔲 | New `PayType` + negotiation flow |
| Deadline on listings | 🔲 | Add `deadlineAt` to `Job` |
| **Service listings** — “I will do X for £Y” | 🔲 | New entity: `Service` / seller offers |
| Categories | ✅ | Flat list in `JOB_CATEGORIES` |
| **Subcategories** | 🔲 | e.g. `category` + `subcategory` |
| **One-off vs recurring** work | 🔲 | Add `engagementType: 'once' \| 'recurring'` |

---

## Poster (buyer) side

| Feature | Status | Notes |
|--------|--------|--------|
| Create & publish posts | ✅ | Server actions + store |
| Set budget (single amount) | ✅ | — |
| Budget range / bids | 🔲 | Bids table + state machine |
| Review proposals / quotes | 🔲 | Enrich `Application` → proposals |
| Compare profiles, ratings, past work | 🔲 | Profiles + reviews |
| Accept / decline / counter offers | 🔲 | Application statuses + actions |
| Milestone-based payment release | 🔲 | Payments + milestones |
| Re-hire previous workers | 🔲 | Relationships / history |
| Urgency flag (ASAP vs flexible) | 🔲 | `urgency` on `Job` |

---

## Worker (seller) side

| Feature | Status | Notes |
|--------|--------|--------|
| Public profile (bio, skills, photo, location) | 🔲 | Clerk metadata or `profiles` table |
| Portfolio / gallery | 🔲 | Media storage |
| Availability & service radius | 🔲 | Profile + geo |
| Bid on jobs | 🔲 | Bidding vs current “apply with message” |
| Fixed-price **service** listings | 🔲 | Separate from task posts |
| Earnings & payout history | 🔲 | Stripe Connect / ledger |
| Response & acceptance rate stats | 🔲 | Derived metrics |

---

## Matching & discovery

| Feature | Status | Notes |
|--------|--------|--------|
| Search & filter (category, location) | 🔲 | Partial: category filter on `/jobs` |
| Filter by price, rating, availability | 🔲 | After data model |
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

1. **Persistence** — Replace in-memory `jobsStore` with a database (e.g. Supabase) and align `Job` / `Application` schema with deadline, urgency, and recurring flags.
2. **Profiles** — Worker profiles linked to Clerk `userId`; extend categories to subcategories.
3. **Services** — Second listing type for “I will do X for £Y”; keep tasks (buyer-initiated) separate.
4. **Bidding & offers** — Evolve `Application` into proposals with amount and status (pending / counter / accepted).
5. **Payments** — Stripe Connect (or regional equivalent) before escrow.
6. **Messaging** — After jobs can be “awarded,” add threads per job.
7. **Search & geo** — Full-text + lat/lng indexes.
8. **Trust & admin** — Reviews, reports, disputes, badges.

This document can be sliced into epics/issues per section as implementation starts.
