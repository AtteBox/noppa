<script lang="ts">
  let items: { text: string; color: string }[] = [];
  let newItem: string = "";
  let currentStep: number = 1;
  let randomChoice: { text: string; color: string } | null = null;
  let rolling: boolean = false;
  let newItemInput: HTMLInputElement;
  let highlightedIndex: number | null = null;
  let customOptions: Record<string, string[]> = loadCustomOptions();

  function generateDistinctColors(amount: number): string[] {
    const colors: string[] = [];
    const step = 360 / amount; // Divide the color wheel into equal parts
    const maxColors = 360; // Reasonable upper limit

    for (let i = 0; i < Math.min(amount, maxColors); i++) {
      const hue = i * step;
      const color = `hsl(${hue}, 60%, 80%)`; // Pastel colors with lower saturation and higher lightness
      colors.push(color);
    }

    return colors;
  }

  function updateColors() {
    const colors = generateDistinctColors(items.length);
    items = items.map((item, index) => ({ ...item, color: colors[index] }));
  }

  function loadCustomOptions(): Record<string, string[]> {
    const saved = localStorage.getItem("customOptions");
    return saved ? JSON.parse(saved) : {};
  }

  function saveCustomOptions(name: string, options: string[]) {
    customOptions = { ...customOptions, [name]: options };
    localStorage.setItem("customOptions", JSON.stringify(customOptions));
  }

  function deleteCustomOptions(name: string, target: Event) {
    target.stopPropagation();
    if (
      confirm(`Are you sure you want to delete the custom option: "${name}"?`)
    ) {
      customOptions = Object.fromEntries(
        Object.entries(customOptions).filter(([key]) => key !== name)
      );
      localStorage.setItem("customOptions", JSON.stringify(customOptions));
    }
  }

  const addItem = () => {
    if (newItem.trim()) {
      items = [...items, { text: newItem, color: "" }];
      newItem = "";
      newItemInput.focus(); // Focus the input element
      updateColors();
    }
  };

  const setPrefilledOptions = (options: string[]) => {
    items = options.map((text) => ({ text, color: "" }));
    updateColors();
  };

  const deleteItem = (index: number) => {
    items = items.filter((_, i) => i !== index);
    updateColors();
  };

  const editItem = (index: number, newValue: string) => {
    items = items.map((item, i) =>
      i === index ? { ...item, text: newValue } : item
    );
  };

  const clearItems = () => {
    items = [];
    randomChoice = null;
    currentStep = 1;
  };

  const clearOptions = () => {
    items = [];
  };

  const handleInputChanged = (event: Event, index: number) => {
    editItem(index, (event.target as HTMLInputElement).value);
  };

  const throwDice = () => {
    if (items.length > 0) {
      rolling = true;
      currentStep = 2;
      let currentIndex = 0;

      const highlightNext = () => {
        highlightedIndex = currentIndex;

        if (currentIndex < items.length - 1) {
          currentIndex++;
        } else {
          const randomIndex = Math.floor(Math.random() * items.length);
          randomChoice = items[randomIndex];
          highlightedIndex = randomIndex;
          setTimeout(() => {
            rolling = false;
            currentStep = 3;
          }, 1000); // Show the final choice for 1 second
          return;
        }

        setTimeout(highlightNext, 200); // Highlight each option for 200ms
      };

      highlightNext();
    } else {
      alert("No items to choose from.");
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      addItem();
    }
  };

  const backToOptions = () => {
    currentStep = 1;
    randomChoice = null;
    highlightedIndex = null;
  };

  const prefilledOptions: Record<string, string[]> = {
    "Dice Numbers": ["1", "2", "3", "4", "5", "6"],
    "Coin Flip": ["Heads", "Tails"],
    Direction: ["Left", "Straight", "Right"],
  };

  function handleSave() {
    const name = prompt("Enter a name for your prefilled options:");
    if (name) {
      saveCustomOptions(
        name,
        items.map((item) => item.text)
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
    <div id="new_item_container">
      <input
        id="new_item_input"
        type="text"
        bind:value={newItem}
        placeholder="New Option"
        bind:this={newItemInput}
        on:keypress={handleKeyPress}
      />
      <button on:click={addItem}>Add Option</button>
    </div>

    <ul>
      {#each items as { text, color }, index}
        <li style="background-color: {color};">
          <input
            id="item_{index}_input"
            type="text"
            bind:value={items[index].text}
            on:input={(e) => handleInputChanged(e, index)}
            style="background-color: {color}; color: white;"
          />
          <button on:click={() => deleteItem(index)}>Delete</button>
        </li>
      {/each}
    </ul>

    <div class="controls">
      <div class="button-group">
        {#if items.length > 1}
          <button class="primary-button" on:click={throwDice}>Throw Dice!</button>
          <button on:click={handleSave}>Save Options</button>
        {/if}
        <button class="destructive-button" on:click={clearOptions}>Clear Options</button>
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
                class="delete-button"
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
{:else if currentStep === 2}
  <div>
    <div class="controls"></div>
    <p>The dice is being thrown...</p>
    <ul>
      {#each items as { text, color }, index}
        <li
          class={highlightedIndex === index ? "highlighted" : ""}
          style="background-color: {color};"
        >
          {text}
        </li>
      {/each}
    </ul>
  </div>
{:else if currentStep === 3}
  <div>
    {#if items.length > 1 && randomChoice}
      <p>
        The random choice is: <span
          style="background-color: {randomChoice.color}; color: white; padding: 0.2em; border-radius: 3px;"
          >{randomChoice.text}</span
        >
      </p>
    {:else}
      <p>There must be at least two options.</p>
    {/if}

    <div class="controls">
      <button class="primary-button" on:click={backToOptions}>Modify Options</button>
      <button on:click={throwDice}>Rethrow Dice</button>
      <button class="destructive-button" on:click={clearItems}>Start Over</button>
      <button on:click={handleSave}>Save Options</button>
    </div>
    <ul>
      {#each items as { text, color }, index}
        <li
          class={randomChoice && randomChoice.text === text
            ? "highlighted"
            : ""}
          style="background-color: {color};"
        >
          {text}
        </li>
      {/each}
    </ul>
  </div>
{/if}

<style>
  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 0.5em;
    padding: 0.5em;
    border-radius: 5px;
    color: white;
  }

  input[type="text"] {
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

  .highlighted {
    border: 2px solid white;
    transform: scale(1.05);
  }

  #new_item_container {
    margin: 8px;
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
    background-color: #007bff;
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

  .delete-button {
    background-color: transparent;
    border: none;
    color: red;
    line-height: 0;
  }

  .prefilled-options-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1em;
  }

  .primary-button {
    background-color: #007bff;
    color: white;
  }

  .primary-button:hover {
    background-color: #0056b3;
  }

  .destructive-button {
    background-color: red;
    color: white;
  }

  .destructive-button:hover {
    background-color: darkred;
  }
</style>
