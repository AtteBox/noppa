<script lang="ts">
  import type { IOption } from "../domain";

  export let options: IOption[] = [];
  const deleteOption = (index: number) => {
    options = options.filter((_, i) => i !== index);
  };

  const editOption = (index: number, newValue: string) => {
    options = options.map((item, i) =>
      i === index ? { ...item, text: newValue } : item,
    );
  };

  const handleOptionInputChanged = (event: Event, index: number) => {
    editOption(index, (event.target as HTMLInputElement).value);
  };
</script>

<ul class="options">
  {#each options as { text, color }, index}
    <li style="background-color: {color};">
      <input
        type="text"
        id="item-{index}-input"
        class="option-input"
        bind:value={options[index].text}
        on:input={(e) => handleOptionInputChanged(e, index)}
        style="background-color: {color};"
        aria-labelledby="{index + 1}. Option Text"
      />
      <button on:click={() => deleteOption(index)}>Delete</button>
    </li>
  {/each}
</ul>

<style>
  input.option-input {
    font-size: 1.5rem;
    margin-right: 0.5em;
  }

  ul.options {
    list-style-type: none;
    padding: 0;
  }

  ul.options > li {
    margin-bottom: 0.5em;
    padding: 0.5em;
    border-radius: 5px;
    color: white;
    display: flex;
    margin: 1rem;
    display: flex;
    gap: 0.1rem;
  }

  input.option-input {
    font-size: 1.5rem;
    margin-right: 0.5em;
    color: white;
  }
</style>
