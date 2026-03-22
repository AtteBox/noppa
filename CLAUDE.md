# CLAUDE.md

## Project
Noppa ("dice" in Finnish) — a virtual dice / random option picker PWA built with Svelte 5, TypeScript, and Vite.

## Commands
- `npm run dev` — dev server (port 5173)
- `npm run build` — production build
- `npm run check` — type-check (svelte-check + tsc)
- `npm run lint` — ESLint
- `npm run format` — Prettier
- `npm run e2e` — Playwright E2E tests (Chromium, Firefox, WebKit)

## Architecture
- **Svelte 5** with runes (`$state`, `$derived`, `run()`) — no stores
- **Single main component:** `src/lib/components/VirtualDice.svelte` — contains the 3-step state machine (DefineOptions → ThrowingDice → Result)
- **Domain logic:** `src/lib/domain/` — `colors.ts` (HSL generation), `options.ts` (types), `prefilledOptions.ts` (localStorage persistence)
- **Dialogs:** `ConfirmDialog.svelte`, `InputDialog.svelte` — reusable modal components
- **Styles:** CSS custom properties in `src/app.css` — dark theme only currently
- **PWA:** configured via `vite-plugin-pwa` in `vite.config.ts`

## Testing
- Playwright E2E only (no unit tests) — tests live in `tests/`
- Tests auto-start dev server; run with `npm run e2e`

## Key types
- `IOption`: `{ text: string; color: string }`
- `IPrefilledOptionLists`: `{ [listName: string]: string[] }`
