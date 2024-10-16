<script lang="ts">
  import ConfirmDialog from "./ConfirmDialog.svelte";
  import InputDialog from "./InputDialog.svelte";
  let confirmDialog: ConfirmDialog;
  let inputDialog: InputDialog;

  let options: { text: string; color: string }[] = [];
  let newOption: string = "";
  let currentStep: number = 1;
  let randomChoice: { text: string; color: string } | null = null;
  let rolling: boolean = false;
  let newOptionInput: HTMLInputElement;
  let highlightedChoice: { text: string; color: string } | null = null;
  let customOptions: Record<string, string[]> = loadCustomOptions();

  function generateDistinctColors(amount: number): string[] {
    const colors: string[] = [];
    const step = 360 / amount;
    const maxColors = 360;

    for (let i = 0; i < Math.min(amount, maxColors); i++) {
      const hue = i * step;
      const color = `hsl(${hue}, 40%, 40%)`;
      colors.push(color);
    }

    return colors;
  }

  function updateColors() {
    const colors = generateDistinctColors(options.length);
    options = options.map((option, index) => ({
      ...option,
      color: colors[index],
    }));
  }

  function loadCustomOptions(): Record<string, string[]> {
    const saved = localStorage.getItem("customOptions");
    return saved ? JSON.parse(saved) : {};
  }

  function saveCustomOptions(name: string, options: string[]) {
    customOptions = { ...customOptions, [name]: options };
    localStorage.setItem("customOptions", JSON.stringify(customOptions));
  }

  async function deleteCustomOptions(name: string, target: Event) {
    target.stopPropagation();
    const isConfirmed = await confirmDialog.open(
      `Are you sure you want to delete the custom option: "${name}"?`
    );
    if (isConfirmed) {
      customOptions = Object.fromEntries(
        Object.entries(customOptions).filter(([key]) => key !== name)
      );
      localStorage.setItem("customOptions", JSON.stringify(customOptions));
    }
  }

  const addOption = () => {
    if (newOption.trim()) {
      options = [...options, { text: newOption, color: "" }];
      newOption = "";
      newOptionInput.focus(); // Focus the input element
      updateColors();
    }
  };

  const setPrefilledOptions = (_options: string[]) => {
    options = _options.map((text) => ({ text, color: "" }));
    updateColors();
  };

  const deleteOption = (index: number) => {
    options = options.filter((_, i) => i !== index);
    updateColors();
  };

  const editOption = (index: number, newValue: string) => {
    options = options.map((item, i) =>
      i === index ? { ...item, text: newValue } : item
    );
  };

  const startOver = () => {
    clearOptions();
    randomChoice = null;
    currentStep = 1;
  };

  const clearOptions = () => {
    options = [];
  };

  const handleOptionInputChanged = (event: Event, index: number) => {
    editOption(index, (event.target as HTMLInputElement).value);
  };

  const throwDice = () => {
    if (options.length === 0) {
      console.warn("throwDice: No options to choose from.");
      return;
    }

    rolling = true;
    currentStep = 2;
    const startTime = Date.now();

    const highlightNext = () => {
      const randomIndex = Math.floor(Math.random() * options.length);
      highlightedChoice = options[randomIndex];

      if (Date.now() - startTime > 3000) {
        randomChoice = options[randomIndex];
        rolling = false;
        currentStep = 3;
        return;
      }

      setTimeout(highlightNext, 200);
    };

    highlightNext();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      addOption();
    }
  };

  const backToOptions = () => {
    currentStep = 1;
    randomChoice = null;
    highlightedChoice = null;
  };

  const prefilledOptions: Record<string, string[]> = {
    "Dice Numbers": ["1", "2", "3", "4", "5", "6"],
    "Coin Flip": ["Heads", "Tails"],
    Direction: ["Left", "Straight", "Right"],
  };

  async function handleSaveCustomOptions() {
    const name = await inputDialog.open(
      "Enter a name for your prefilled options:"
    );
    if (name) {
      saveCustomOptions(
        name,
        options.map((item) => item.text)
      );
    }
  }
</script>

<div class="breadcrumb">
  <span class={currentStep === 1 ? "active" : ""}>Step 1: Create Options</span>
  <span class={currentStep === 2 ? "active" : ""}>Step 2: Throwing Dice</span>
  <span class={currentStep === 3 ? "active" : ""}>Step 3: Result</span>
</div>

{#if currentStep === 1}
  <div>
    <div id="new-option-container">
      <input
        id="new_item_input"
        class="option-input"
        type="text"
        bind:value={newOption}
        placeholder="New Option"
        bind:this={newOptionInput}
        on:keydown={handleKeyDown}
      />
      <button on:click={addOption}>Add Option</button>
    </div>

    <ul>
      {#each options as { text, color }, index}
        <li class="dice-option" style="background-color: {color};">
          <input
            id="item_{index}_input"
            class="option-input"
            type="text"
            bind:value={options[index].text}
            on:input={(e) => handleOptionInputChanged(e, index)}
            style="background-color: {color}; color: white;"
          />
          <button on:click={() => deleteOption(index)}>Delete</button>
        </li>
      {/each}
    </ul>

    <div class="controls">
      <div class="button-group">
        {#if options.length > 1}
          <button class="primary" on:click={throwDice}>Throw Dice!</button>
          <button on:click={handleSaveCustomOptions}>Save Options</button>
        {/if}
        <button class="destructive-button" on:click={clearOptions}
          >Clear Options</button
        >
      </div>
    </div>

    <div class="prefilled-options">
      <h3>Prefilled Options:</h3>
      <div class="prefilled-options-container">
        {#each Object.keys(prefilledOptions) as option}
          <button on:click={() => setPrefilledOptions(prefilledOptions[option])}
            >{option}</button
          >
        {/each}
        {#each Object.keys(customOptions) as customOption}
          <div class="custom-option">
            <button
              on:click={() => setPrefilledOptions(customOptions[customOption])}
              >{customOption}
              <button
                class="destructive"
                title="Delete prefilled option"
                on:click={(e) => deleteCustomOptions(customOption, e)}
                >✖</button
              ></button
            >
          </div>
        {/each}
      </div>
    </div>
  </div>
{:else if currentStep === 2 && highlightedChoice}
  <div>
    <p>
      <span
        style="background-color: {highlightedChoice.color};"
        class="highlighted-choice">{highlightedChoice.text}</span
      >
    </p>
  </div>
{:else if currentStep === 3 && randomChoice}
  <div>
    <p>
      <span
        style="background-color: {randomChoice.color};"
        class="highlighted-choice">{randomChoice.text}</span
      >
    </p>
    <div class="controls">
      <button class="primary" on:click={backToOptions}>Modify Options</button>
      <button on:click={throwDice}>Rethrow Dice</button>
      <button class="destructive-button" on:click={startOver}>Start Over</button
      >
      <button on:click={handleSaveCustomOptions}>Save Options</button>
    </div>
  </div>
{/if}

<ConfirmDialog bind:this={confirmDialog} />
<InputDialog bind:this={inputDialog} />

<style>
  ul {
    list-style-type: none;
    padding: 0;
  }

  li.dice-option {
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
  }

  .controls {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 3em;
    gap: 1em;
  }

  .button-group {
    display: flex;
    gap: 0.5em;
  }

  #new-option-container {
    margin: 1rem;
    display: flex;
    gap: 0.1rem;
  }

  .breadcrumb {
    font-size: 0.9rem;
    display: flex;
    justify-content: center;
    gap: 1em;
    margin-bottom: 3em;
  }

  .breadcrumb span {
    padding: 0.5em;
    border-radius: 5px;
  }

  .breadcrumb .active {
    font-weight: bold;
    text-decoration: underline;
    color: white;
  }

  .prefilled-options {
    margin-top: 2em;
    text-align: center;
  }

  .prefilled-options button {
    margin: 0.5em;
    padding: 0.5em 1em;
  }

  .custom-option {
    display: flex;
    align-items: center;
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

  .highlighted-choice {
    color: var(--highlight-text);
    padding: 0.3em 0.5em;
    border-radius: 4px;
    font-weight: bold;
    font-size: 2rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    text-shadow: #000 0px 0px 1px;
    -webkit-font-smoothing: antialiased;
  }
</style>
