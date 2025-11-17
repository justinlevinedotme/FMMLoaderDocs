# Repository Guidelines

## Project Structure & Module Organization

- Framework: Next.js 16 with the App Router, powered by Nextra docs theme and TypeScript.
- Routes live under `src/app/[lang]`; MDX pages resolve via `[[...mdxPath]]`, enabling language-specific docs.
- Content is authored in `src/content/{lang}`; keep shared assets in `src/assets` and static files in `public`.
- Reusable UI sits in `src/components` and `src/widgets`; hooks go in `src/hooks`; shared utilities live in `src/lib`.
- Styling flows through `src/app/[lang]/styles` plus component-scoped styles; favor existing patterns before adding new ones.

## Build, Test, and Development Commands

- `pnpm install` — install deps (Node 20+/pnpm 9+ required).
- `pnpm dev` — run the docs locally with Turbopack on port 8000.
- `pnpm build` — production build; generates the static output for deploy.
- `pnpm start` — serve the built app on port 7000.
- `pnpm lint` — lint (with autofix) using the repo ESLint config; run before pushing.
- `pnpm postbuild` is triggered after build to generate the sitemap (`next-sitemap`) and search index (`pagefind`); rerun if those artifacts need updating.

## Coding Style & Naming Conventions

- Language: TypeScript-first; prefer `.tsx` for components and MDX for content.
- Components and files: PascalCase for React components (e.g., `HeroSection.tsx`); hooks prefixed with `use*`; utility modules in `src/lib` use camelCase filenames.
- Follow the existing ESLint rules (`@antfu` base + Next.js presets); avoid disabling rules unless justified.
- Keep imports order consistent; group local paths after third-party deps.
- Keep MDX frontmatter minimal; current locale is `en`. If adding locales, mirror folder structures under `src/content/{lang}` and `src/i18n`.

## Testing Guidelines

- No dedicated automated test suite is present; rely on `pnpm lint` and local preview (`pnpm dev`) to catch regressions.
- When adding functionality, supply focused checks (e.g., add lightweight unit tests or MDX link validation scripts) and document how to run them.
- Validate new/changed pages for broken links, i18n parity, and layout regressions before opening a PR.

## Commit & Pull Request Guidelines

- Commits: use short, imperative messages (e.g., “Add hero animation”, “Fix nav links”); group related changes.
- PRs: include a concise summary, screenshots/GIFs for UI changes, and links to related issues or specs.
- Must pass `pnpm lint` and `pnpm build` locally before requesting review; note any intentional follow-ups in the PR description.
- Keep changes scoped: prefer multiple small PRs over large ones, and align content updates across languages when applicable.
