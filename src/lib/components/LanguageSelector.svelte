<script lang="ts">
  import { getLocale, setLocale, locales, localeNames } from "../i18n";
  import type { Locale } from "../i18n";

  function handleChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    setLocale(select.value as Locale);
  }
</script>

<select
  class="language-selector"
  value={getLocale()}
  onchange={handleChange}
  aria-label="Language"
>
  {#each locales as locale}
    <option value={locale}>{localeNames[locale]}</option>
  {/each}
</select>

<style>
  .language-selector {
    background-color: var(--button-bg);
    color: var(--text-color);
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 0.3em 0.5em;
    font-size: 0.85rem;
    cursor: pointer;
  }

  .language-selector:hover {
    border-color: var(--input-border-color);
  }
</style>
