<script lang="ts">
  import type { IPrefilledOptionLists } from "../domain";

  export let prefilledOptions: IPrefilledOptionLists = {};
  export let userPrefilledOptions: IPrefilledOptionLists = {};
  export let setOptions: (options: string[]) => void;
  export let deleteUserPrefilledOptions: (name: string) => void;
</script>

<div class="prefilled-options-container">
  {#each Object.keys(prefilledOptions) as option}
    <button on:click={() => setOptions(prefilledOptions[option])}
      >{option}</button
    >
  {/each}
</div>
<div class="user-option-scroll-container">
  <div class="prefilled-user-options-container">
    {#each Object.keys(userPrefilledOptions) as customOption}
      <div class="custom-option">
        <button on:click={() => setOptions(userPrefilledOptions[customOption])}
          >{customOption}</button
        >
        <button
          class="destructive"
          title="Delete prefilled option"
          on:click|stopPropagation={(e) =>
            deleteUserPrefilledOptions(customOption)}>✖</button
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
    overflow-y: auto;
    max-height: 20rem;
    max-width: 50rem;
  }
</style>
