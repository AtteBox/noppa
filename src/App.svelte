<script lang="ts">
  import githubLogo from "./assets/github-mark-white.svg";
  import VirtualDice from "./lib/components/VirtualDice.svelte";
  import LanguageSelector from "./lib/components/LanguageSelector.svelte";
  import ThemeToggle from "./lib/components/ThemeToggle.svelte";
  import { t } from "./lib/i18n/index.svelte";
</script>

<main>
  <div class="header-row">
    <h1>{t("appTitle")}</h1>
    <ThemeToggle />
    <LanguageSelector />
  </div>

  <p class="read-the-docs">
    {t("appDescription")}
  </p>
  <VirtualDice />
</main>
<footer>
  <p>
    © Atte Virtanen {new Date().getFullYear()}
    <a
      href="https://github.com/AtteBox/noppa"
      title={t("openCodeInGithub")}
      target="_blank"
      rel="noopener noreferrer"
      ><img id="github-link-logo" src={githubLogo} alt="Github logo" /></a
    >
  </p>
</footer>

<style>
  .read-the-docs {
    color: #888;
    margin-bottom: 2rem;
  }

  .header-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  #github-link-logo {
    margin-top: -0.2rem;
    height: 1.5rem;
    margin-left: 0.8rem;
    vertical-align: middle;
  }

  :global([data-theme="light"]) #github-link-logo {
    filter: invert(1);
  }

  footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    padding: 1rem;
  }
</style>
