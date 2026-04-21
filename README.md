# BIP Explainer

A static, layered explainer for blockchain protocol proposals. The MVP covers Bitcoin's BIP 360 (Pay-to-Merkle-Root) and BIP 361 (Post-Quantum Migration and Legacy Signature Sunset).

**Live site:** [https://saschb2b.github.io/bip-explainer](https://saschb2b.github.io/bip-explainer)

## What this is

Most explainers of blockchain proposals are either too shallow or too dense. This project tests a middle path: a single page that lets a non-developer crypto user form a defensible view in 15 minutes, with four depth levels, a map of disagreement types, and personalized impact based on wallet setup.

## Tech stack

- [Astro](https://astro.build/) — static site generator
- [Tailwind CSS](https://tailwindcss.com/) — styling
- Vanilla JS — minimal interactivity (depth tabs, impact dropdowns)
- GitHub Pages — hosting via GitHub Actions

## Content structure

Each proposal lives in its own directory under `content/proposals/`:

```
content/proposals/{chain}-{id}/
  index.md           # Frontmatter + 4 depth-level explainers
  disagreements.json # Array of critique cards with type tags
  voices.json        # Array of voices with primary-source links
  impacts.json       # Impact paragraphs keyed by wallet × address type
```

This structure is designed to generalize to other chains (Ethereum EIPs, Cardano CIPs, etc.).

## Running locally

```bash
npm install
npm run dev
```

## Building

```bash
npm run build
```

Output goes to `dist/`.

## Deployment

Pushes to `main` trigger the GitHub Actions workflow in `.github/workflows/deploy.yml`, which builds and deploys to GitHub Pages.

## Editorial policy

- Every disagreement card is tagged by its type (definitional, factual, values, technical-judgment).
- Every voice links to a primary source, never a journalist's summary alone.
- The page never tells you what to do.

## Contributing

Open an issue or pull request on GitHub. Content updates should edit the Markdown/JSON files in `content/proposals/`.
