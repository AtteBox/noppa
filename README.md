# Noppa 🎲 — A Virtual Dice

A dice for any options: an app (PWA) for randomly picking an option from a list which the user can enter.

You can try the deployed "production" version here: https://main.dfmzvros4dh9z.amplifyapp.

## Idea / Background

> "Noppa" is Finnish for "dice". The idea for this app actually came from my boss, who probably 10 years ago hinted about this idea. I didn't think much of it back then and now there probably are hundreds of similar apps. However, I came to think about this when we had picked what movie to watch using an actual dice, and I thought it would be useful to be able to save the options, such as lunch place alternatives, and then just roll the dice to pick one. I didn't even Google for existing apps, because I thought this would be a great very small project to do to learn some new technologies.

## Features

- pick a random option from a list you can enter
- save the list to local storage
- predefined options (dice numbers, coin toss)
- installable as a PWA (works offline)
- easy to use

## About the Code

I decided to use [Svelte](https://svelte.dev/), because I wanted to try it out. In addition to that I only used familiar technologies, such as [Vite](https://vite.dev/) and [Playwright](https://playwright.dev/) so that I could focus on learning Svelte and get the app done quickly.

I have also used as much AI as possible to get the foundation done as quickly as possible. This time I started by using ChatGPT to generate one Svelte component that included all the most central parts of the app. I then modified and refactored the code to be more readable and maintainable.

The PWA functionality was added (very easily) using the [vite-plugin-pwa](https://github.com/vite-pwa/vite-plugin-pwa) plugin.

## Development

### Prerequisites:

- Node.js >= 20

### Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### Getting Started

This is a [Vite](https://vite.dev/) project bootstrapped with `create-vite`.

First, run the development server:

```bash
npm run dev
```

Open [ http://localhost:5173](http://localhost:5173) with your browser to see the result.

ESLint and Prettier was added for linting and formatting, to enable a consistent code style. You can run the following commands to lint and format the code:

```bash
npm run format
npm run lint
```

## Testing

### E2E Tests

The app is tested using [Playwright](https://playwright.dev/). The tests are located in the `tests`-folder. You can run the tests using:

```bash
npm run test:e2e
```

You can also run the tests in UI-mode (good while developing):

```bash
npm run test:e2e:ui
```

## Deployment

The app is deployed using [AWS Amplify](https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html). The deployment is triggered by pushing to the main-branch.

## Vite/Svelte/Typescript Project FAQ

**Why `global.d.ts` instead of `compilerOptions.types` inside `jsconfig.json` or `tsconfig.json`?**

Setting `compilerOptions.types` shuts out all other types not explicitly listed in the configuration. Using triple-slash references keeps the default TypeScript setting of accepting type information from the entire workspace, while also adding `svelte` and `vite/client` type information.

**Why include `.vscode/extensions.json`?**

Other templates indirectly recommend extensions via the README, but this file allows VS Code to prompt the user to install the recommended extension upon opening the project.

**Why enable `allowJs` in the TS template?**

While `allowJs: false` would indeed prevent the use of `.js` files in the project, it does not prevent the use of JavaScript syntax in `.svelte` files. In addition, it would force `checkJs: false`, bringing the worst of both worlds: not being able to guarantee the entire codebase is TypeScript, and also having worse typechecking for the existing JavaScript. In addition, there are valid use cases in which a mixed codebase may be relevant.

**Why is HMR not preserving my local component state?**

HMR state preservation comes with a number of gotchas! It has been disabled by default in both `svelte-hmr` and `@sveltejs/vite-plugin-svelte` due to its often surprising behavior. You can read the details [here](https://github.com/rixo/svelte-hmr#svelte-hmr).

If you have state that's important to retain within a component, consider creating an external store which would not be replaced by HMR.

```ts
// store.ts
// An extremely simple external store
import { writable } from "svelte/store";
export default writable(0);
```
