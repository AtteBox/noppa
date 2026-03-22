# Noppa — TODO

Planned features and fixes for the next iteration of Noppa.

---

## 1. Bug Fixes / Polish

### CSS class mismatch on destructive buttons
- **Files:** `src/lib/components/VirtualDice.svelte` (lines 168, 199)
- **Issue:** "Clear Options" and "Start Over" buttons use class `destructive-button`, but `src/app.css` only defines `button.destructive`. These buttons don't get the red styling.
- **Fix:** Change `class="destructive-button"` to `class="destructive"` on both buttons.

### InputDialog validation logic is inverted
- **File:** `src/lib/components/InputDialog.svelte` (line 37)
- **Issue:** `showValidationError` is derived as `!isRequired || !!inputValue`, which shows the validation message when it should be hidden and vice versa. The validation error ("Please enter a name.") appears initially when the dialog opens with `isRequired=true`.
- **Fix:** Change the derived expression to `isRequired && !inputValue` so the error only shows when the field is required and empty.

---

## 2. History / Log

Show users their past dice throw results within a session.

- [ ] Add a `history` state array to `VirtualDice.svelte` that records each result (`{ option: IOption, timestamp: Date }`)
- [ ] Display history in a collapsible section below the main dice area
- [ ] Show each past result with its color and timestamp
- [ ] Add a "Clear History" button
- [ ] Optional: persist history to `localStorage` so it survives page reloads
- [ ] Add E2E tests for history display and clearing

---

## 3. Multiple Dice Throws

Allow users to randomly pick N options at once from the list (e.g., "pick 3 from 10").

- [ ] Add a number input or stepper to select how many options to pick (default: 1)
- [ ] Validate that N ≤ total number of options
- [ ] Select N unique options (no duplicates in a single throw)
- [ ] Display all selected options in the result view, each with its color
- [ ] Update the dice animation to reflect multi-pick (e.g., multiple dice or sequential reveals)
- [ ] Record multi-throw results in history (if implemented)
- [ ] Add E2E tests for multi-throw scenarios

---

## 4. Light / Dark Theme Toggle

The app is currently dark-only. Add a light theme and a toggle.

- [ ] Define light theme CSS variables in `src/app.css` (the dark theme already uses CSS custom properties like `--primary-color`, `--bg-color`, etc.)
- [ ] Add a `[data-theme="light"]` or `.light-theme` selector with light color values
- [ ] Add a toggle button (sun/moon icon) in the app header or footer (`src/App.svelte`)
- [ ] Default to the user's OS preference via `prefers-color-scheme` media query
- [ ] Persist the user's choice to `localStorage`
- [ ] Ensure option colors (`src/lib/domain/colors.ts`) remain readable in both themes — may need to adjust HSL lightness/saturation per theme
- [ ] Update `index.html` `theme-color` meta tag dynamically
- [ ] Add E2E test for theme switching

---

## 5. Enhanced Animations

Current animation: a rotating 🎲 emoji (0.8s rotation, 3-second duration). Enhance the throwing experience.

- [ ] Replace or augment the spinning emoji with a richer animation (e.g., slot-machine style scrolling through options, a wheel spin, or bouncing dice)
- [ ] Add a result reveal animation (e.g., scale-up, fade-in, or "pop" effect when the result appears)
- [ ] Add optional confetti or particle effect on result reveal
- [ ] Consider using CSS transitions/animations or a lightweight library (e.g., `canvas-confetti`)
- [ ] Ensure animations are smooth on mobile devices
- [ ] Respect `prefers-reduced-motion` for accessibility

---

## 6. Internationalization (i18n)

The app name "Noppa" is Finnish for "dice" — add multi-language support.

- [ ] Extract all hardcoded UI strings from components (primarily `src/lib/components/VirtualDice.svelte`, plus dialogs and `App.svelte`)
- [ ] Create a simple translation system — e.g., JSON files per locale in `src/lib/i18n/` (`en.json`, `fi.json`)
- [ ] Create a locale store/context that components can subscribe to
- [ ] Add a language switcher in the UI (dropdown or flag icons)
- [ ] Persist language preference to `localStorage`
- [ ] Start with two languages: **English** (default) and **Finnish**
- [ ] Ensure prefilled option names ("Dice Numbers", "Coin Flip", "Direction") are also translated
- [ ] Add E2E tests verifying language switching works

---

## Implementation Notes

- **Tech stack:** Svelte 5 (runes), Vite, TypeScript, Playwright
- **State management:** Svelte 5 `$state` and `$derived` runes in `VirtualDice.svelte`
- **Persistence:** `localStorage` via `src/lib/domain/prefilledOptions.ts` pattern
- **CSS architecture:** CSS custom properties in `src/app.css` — extend this pattern for theming
- **Testing:** Playwright E2E tests in `tests/` — add new test files per feature
