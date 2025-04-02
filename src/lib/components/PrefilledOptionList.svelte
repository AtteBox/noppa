<script lang="ts">
  import type { IPrefilledOptionLists } from "../domain/prefilledOptions";

  interface Props {
    prefilledOptions?: IPrefilledOptionLists;
    userPrefilledOptions?: IPrefilledOptionLists;
    setOptions: (options: string[]) => void;
    deleteUserPrefilledOptions: (name: string) => void;
  }

  let {
    prefilledOptions = {},
    userPrefilledOptions = {},
    setOptions,
    deleteUserPrefilledOptions,
  }: Props = $props();
</script>

<div class="prefilled-options-container">
  {#each Object.keys(prefilledOptions) as option}
    <button onclick={() => setOptions(prefilledOptions[option])}
      >{option}</button
    >
  {/each}
</div>
<div class="user-option-scroll-container">
  <div class="prefilled-user-options-container">
    {#each Object.keys(userPrefilledOptions) as customOption}
      <div class="custom-option">
        <button onclick={() => setOptions(userPrefilledOptions[customOption])}
          >{customOption}</button
        >
        <button
          class="destructive"
          title="Delete {customOption}"
          onclick={() => deleteUserPrefilledOptions(customOption)}>✖</button
        >
      </div>
    {/each}
  </div>
</div>

<style>
  .custom-option {
    display: flex;
    justify-content: center;
    gap: 0.5em;
  }

  .prefilled-options-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1em;
    max-width: 50rem;
  }

  .prefilled-user-options-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    gap: 1em;
  }

  .user-option-scroll-container {
    margin-top: 1.5rem;
    overflow: auto;
    max-height: 20rem;
    max-width: 50rem;
  }
</style>
