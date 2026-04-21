# BIP Explainer — Build Task Document

## Project Overview
A static, single-page explainer for blockchain protocol proposals. The MVP explains Bitcoin's BIP 360 (Pay-to-Merkle-Root) and BIP 361 (Post-Quantum Migration and Legacy Signature Sunset). Built for long-time crypto holders who are not protocol developers.

**Design principle:** Clean, modern, quiet. White surfaces, generous whitespace, system fonts, single accent color. Not a typical crypto site. Not an "AI" aesthetic.

**Tech Stack:** Astro + Tailwind CSS + Markdown/JSON content. Zero client-side JS except for the depth toggle and impact dropdowns.

**Deployment:** GitHub Pages via GitHub Actions.

**Extensibility:** The content model and routing must generalize to future proposals (other Bitcoin BIPs, Ethereum EIPs, Cardano CIPs, etc.).

---

## Content Architecture

### File Structure
```
content/
  proposals/
    bitcoin-bip-360-361/
      index.md          # Frontmatter: status, dates, signals; Body: 4 depth levels
      disagreements.json
      voices.json
      impacts.json
```

### Content Schema

**index.md frontmatter:**
- `chain`: "Bitcoin"
- `category`: "Quantum resistance"
- `title`: "BIP 360 + BIP 361"
- `subtitle`: one-liner
- `status`: "contested"
- `affects`: "~6.7M BTC"
- `lastUpdated`: ISO date
- `signals`: object with 4 key/value pairs
- `breadcrumb`: array of { label, href? }

**index.md body:**
4 depth sections separated by `## Level: Name` headings:
- Plain English
- Informed User
- Developer
- Spec (links only)

**disagreements.json:**
Array of { title, summary, type, typeDescription, link }
Types: definitional, factual, values, technical-judgment

**voices.json:**
Array of { name, role, roleType, position, sourceUrl }
roleTypes: author, critic, alternative

**impacts.json:**
Object keyed by `walletVintage` × `addressType` combinations.
Values: { severity: "high"|"medium"|"low"|"info", text }

---

## UI Sections (in order)

### 1. Header Block
- Breadcrumb with subtle chevrons
- Title + subtitle
- Status row: status badge, affected-supply badge, last-updated date

### 2. Depth Toggle / Explainer
- 4 tab buttons horizontally (stack on mobile)
- Tab switches visible explainer section via simple JS class toggle
- All 4 levels are pre-rendered in HTML; JS only shows/hides
- Spec level is a list of primary-source links

### 3. Disagreement Map
- 4 cards in a responsive grid (1 col mobile, 2 col tablet, 4 col desktop)
- Each card: title, summary, colored type-tag with tooltip
- Type tag colors: definitional (slate), factual (blue), values (amber), technical-judgment (purple)
- Tooltip explains the disagreement type on hover/focus

### 4. What This Means For You
- Two `<select>` dropdowns: Wallet vintage, Address type
- JS reads both values, looks up the matching impact in a pre-rendered map, and swaps the visible paragraph
- Result box color-coded by severity (red/yellow/blue/gray)
- "Unsure" options route to a plain-English wallet identification mini-guide

### 5. Live Signal Panel
- 4 metric cards in a grid
- Each card: label, value, context line
- Section-level "Last updated" date
- Values are hand-curated; no API calls

### 6. Voices
- 3-5 cards in a row
- Each: initials avatar, name, role badge, one-line position, external link

### 7. Footer
- Page-level last updated
- Editorial policy paragraph
- GitHub contribution link

---

## Design System

- **Surface:** white (`#ffffff`), subtle gray background (`#f8f9fa`) for alternate sections
- **Text:** near-black (`#111827`), secondary (`#4b5563`), muted (`#9ca3af`)
- **Accent:** teal (`#0d9488`) — used sparingly for interactive states and primary badges
- **Severity colors:** red-50/red-700 (high), amber-50/amber-700 (medium), blue-50/blue-700 (low), slate-50/slate-700 (info)
- **Font:** system-ui, -apple-system, sans-serif
- **Spacing:** generous; section padding `py-16` to `py-20`
- **Radius:** `rounded-lg` for cards, `rounded-md` for buttons/badges
- **Shadows:** minimal — `shadow-sm` on cards, no heavy elevation
- **Motion:** none for MVP. Instant tab/dropdown swaps.

---

## Extensibility Plan

1. **Routing:** Each proposal becomes a directory under `content/proposals/{chain}-{id}/`. Astro dynamic routes generate pages from these.
2. **Index page:** Later, an `/index.astro` lists all proposals from the content directory.
3. **Chain-agnostic schema:** The frontmatter uses generic keys (`chain`, `category`, `proposalId`) so Ethereum/Cardano content drops in unchanged.
4. **Components:** All sections are Astro components that accept props; they accept any proposal content without code changes.

---

## Deployment

- GitHub Actions workflow on `push` to `main`
- Uses `actions/deploy-pages` with Astro static build
- Custom domain not required for MVP; deploys to `https://sascha.github.io/bip-explainer`

---

## Build Phases

1. **Setup & Content** — Astro init, Tailwind, content files, base layout
2. **Sections** — Build each section as an Astro component, wire up vanilla JS for tabs/dropdowns
3. **Polish** — Responsive pass, accessibility, color contrast, editorial policy footer
4. **Deploy** — GitHub Actions workflow, build test, commit & push
