# Vornela Systems — CRO Upgrade Design Spec
Date: 2026-05-06

## Overview

A conversion layer upgrade across the Vornela Systems website. Goal: increase the rate at which visitors book a strategy call or submit an audit request. No new pages. No framework changes. Plain HTML/CSS/JS only.

Primary conversion action: **Book a Strategy Call** (`book-a-call.html`)
Secondary conversion action: **Free AI Audit** (`audit.html`)

---

## 1. Announcement Bar — `index.html`

A thin bar above the nav, sticky on scroll. Soft availability signal that drives to the audit page.

**Content:**
> "We're taking on new clients this month — **Book a Free AI Audit →**"

**Behaviour:**
- Sits above `.nav` in the DOM, pushes nav down
- Sticky: sticks to top of viewport on scroll along with the nav
- Dismissible via × button
- On dismiss: hide bar, set `localStorage` key `vornela_bar_dismissed` with timestamp; suppress for 7 days
- On page load: check timestamp — if within 7 days, hide immediately

**Design:**
- Background: `rgba(143,245,255,.07)`
- Border-bottom: `1px solid rgba(143,245,255,.15)`
- Pulsing dot (6px, `#8ff5ff`, opacity 1→0.3 on 2s loop) left of text
- Text: Space Grotesk 12.5px, `rgba(232,230,231,.75)`
- CTA: Space Grotesk 12px 700, `#8ff5ff`, uppercase, underlined, links to `audit.html`
- Close button: `rgba(173,170,171,.3)`, top-right absolute

---

## 2. Credibility Section — `index.html`

A new section inserted between the Stats section and the "Is This Right For You?" (qualify) section. Explains what the free audit actually covers so visitors understand what they're signing up for.

**Heading:**
- Label: `THE FREE AI AUDIT`
- Title: `We look at your business. Tell you exactly where you're leaking money.`
- Subtext: `No templates. No generic advice. We review your online presence, your lead flow, and your day-to-day operations — then show you what's costing you most.`

**Audit areas grid (3×2):**
1. **Online Presence & Findability** — Google rankings, local search visibility, Google Business Profile, social presence
2. **Lead Capture & Follow-Up Gaps** — Missed calls, slow responses, no follow-up system
3. **Automation Opportunities** — Invoicing, reminders, scheduling, client comms — hours/week estimate
4. **Website Conversion Review** — Speed, mobile experience, trust signals, CTAs
5. **Competitor Positioning** — Benchmarking vs. closest competitors
6. **Time & Revenue Leakage** — Rough number: most businesses are losing 8–15 hrs/week and €2k–€8k/month to fixable inefficiencies

**"What happens after you submit" strip (3 steps):**
1. We review your business — website, Google presence, online footprint within 24 hours
2. You get our findings — plain-English breakdown, no jargon
3. We talk about the fix — if it makes sense, we book a call to walk through highest-priority issues

**CTAs:**
- Primary: `Claim Your Free Audit` → `audit.html`
- Ghost: `Book a Strategy Call →` → `book-a-call.html`
- Reassurance: `Free. We respond within 24 hours.`

**Design:** Matches existing site dark theme. Section wrapper `rgba(255,255,255,.025)` bg, `rgba(255,255,255,.07)` border, 4px radius. Audit item cards have a left accent bar gradient (`#8ff5ff` → `#669dff`). "What happens after" strip has `rgba(143,245,255,.04)` bg with numbered circles connected by `→` arrows.

---

## 3. "What Happens Next" Sidebar — `book-a-call.html`

A right-column panel visible alongside the multi-step form for the entire form journey (steps 1–5). Reduces uncertainty before submission.

**Layout:** Two-column grid — form left, sidebar right (380px fixed width). Collapses to single column on mobile (sidebar moves above form).

**Label:** `WHAT HAPPENS AFTER YOU BOOK`

**4 steps (connected by vertical line):**
1. **You get a confirmation** — Calendar invite within 24 hours. We'll suggest a few times, you pick one.
2. **We do our homework** — Before the call we review your website, Google presence, and online footprint. You won't be explaining yourself from scratch.
3. **30-minute strategy call** — We walk you through exactly what we found and what we'd fix first. No pitch deck, just clarity on what's costing you.
4. **You decide what's next** — We walk you through what we'd do and what it would look like. You leave with a clear picture of your options.

**Reassurance badges (2):**
- Clock icon: `Response within 24 hours`
- Check icon: `We review your business before the call`

**Design:** `rgba(143,245,255,.04)` bg, `rgba(143,245,255,.12)` border. Step numbers: 28px circles, `rgba(143,245,255,.08)` bg. Connecting line: `rgba(143,245,255,.12)`.

---

## 4. Exit-Intent Slide-In — `index.html` (and optionally all pages)

Appears when the user's cursor moves toward the browser chrome (exit intent). Bottom-right corner, slides up from below viewport.

**Content:**
- Tag: `FREE AI AUDIT`
- Headline: `Before you go — find out what's costing you.`
- Subtext: `Drop your details and we'll send you a quick breakdown of where your business is leaking leads and time.`
- Fields: Email (required) + Website or social handle (required, placeholder: `Website or social handle (e.g. yoursite.com)`)
- CTA button: `Get the Free Audit`
- Dismiss link: `No thanks, I'm not interested`

**Behaviour:**
- Trigger: `mouseleave` event on `document` where `e.clientY < 20` (cursor near top of viewport)
- On trigger: slide up into view (translateY 0 from translateY(100%)), 300ms ease-out
- On dismiss (× or dismiss link): slide back down, set `localStorage` key `vornela_exit_dismissed` with timestamp; suppress for 7 days
- On form submit: POST email + website to Google Apps Script endpoint (same endpoint as other forms), `formType: 'exit-intent'`; hide slide-in on success
- Not shown if user has already submitted the audit form this session (`sessionStorage` flag)
- Shown max once per page load (re-trigger after close = no)

**Design:** 340px wide. `#13151a` bg, `rgba(143,245,255,.2)` border, 2px gradient top bar (`#8ff5ff` → `#669dff`). `box-shadow: 0 8px 40px rgba(0,0,0,.6)`. Fields: `rgba(255,255,255,.05)` bg, focus border `rgba(143,245,255,.4)`. Primary button: `#8ff5ff` bg, `#0d0e12` text.

---

## 5. Capability Page CTA Upgrades — all 4 capability pages

Each capability page currently ends with a single "Book a Call" CTA. Add a secondary audit CTA alongside it.

**Affected files:**
- `capabilities/ai-automations.html`
- `capabilities/website-design.html`
- `capabilities/seo-ads.html`
- `capabilities/customer-intelligence.html`

**Change:** Replace single `.btn` anchor with a two-button row + reassurance line.

**Per-page copy (headline + subtext unchanged, buttons standardised):**

| Page | Headline | Subtext |
|------|----------|---------|
| AI Automations | What's eating your team's time? | Tell us about your most repetitive process and we'll show you exactly where to start. |
| Website Design | Ready to build something real? | Tell us about your business and we'll get back to you within 24 hours. |
| SEO & Ads | Want more eyes on your business? | Tell us where you want to rank and we'll show you exactly how to get there. |
| Customer Intelligence | Know your customers better than they know themselves. | Tell us what data you have and we'll show you what's hiding in it. |

**Buttons (all pages):**
- Primary: `Book a Strategy Call` → `../book-a-call.html`
- Ghost: `Get a Free Audit →` → `../audit.html`
- Reassurance: `Free audit · We respond within 24 hours.`

---

## Files Changed

| File | Change |
|------|--------|
| `index.html` | Add announcement bar, credibility section, exit-intent slide-in + JS |
| `styles.css` | Add styles for all new components |
| `main.js` | Add announcement bar dismiss logic, exit-intent trigger + submit logic |
| `book-a-call.html` | Add two-column layout with "What Happens Next" sidebar |
| `capabilities/ai-automations.html` | CTA upgrade |
| `capabilities/website-design.html` | CTA upgrade |
| `capabilities/seo-ads.html` | CTA upgrade |
| `capabilities/customer-intelligence.html` | CTA upgrade |

## Out of Scope

- Copy rewrites to existing index.html sections (hero, services, process, etc.) — existing copy is adequate; these additions do the conversion work
- New pages
- Backend changes (Google Apps Script endpoint already handles all form types)
