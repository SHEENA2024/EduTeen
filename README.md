# EduTeen Platform 🚀

A front-end scaffold for the **EduTeen** learning platform — a modern React application built with Create React App, Tailwind CSS, and Lucide icons.

---

## Tech Stack 🔧

- **Framework:** React 19 (Create React App)
- **Styling:** Tailwind CSS + PostCSS
- **Icons:** lucide-react
- **Testing:** React Testing Library, Jest
- **Builder / Tooling:** react-scripts, ESLint

---

## Features ✨

- Clean React structure bootstrapped with Create React App
- Utility-first styling with Tailwind CSS
- Lightweight vector icons via `lucide-react`
- Preconfigured testing setup using React Testing Library

---

## Quick Start ⚡

### Prerequisites

- Node.js (LTS recommended — 18+)
- npm (or use a compatible package manager)

### Install

```bash
npm install
```

### Run locally

```bash
npm start
```

Open http://localhost:3000

### Build for production

```bash
npm run build
```

### Run tests

```bash
npm test
```

---

## Project Structure 🗂️

- `public/` — static assets & `index.html`
- `src/` — application source (`App.js`, `index.js`, `App.css`, tests)
- `tailwind.config.js`, `postcss.config.js` — Tailwind setup
- `package.json` — scripts & dependencies

---

## Styling / Tailwind Notes 🎨

- Configure design tokens and plugins in `tailwind.config.js`.
- Global styles in `src/index.css` and `src/App.css`.
- If you change Tailwind config, restart the dev server to ensure the changes apply.

---

## Testing 🧪

- Tests use **React Testing Library** and live next to components (`App.test.js`).
- Run `npm test` for watch-mode testing.

