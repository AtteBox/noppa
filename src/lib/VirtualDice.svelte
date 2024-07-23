<script lang="ts">
  let items: { text: string, color: string }[] = [];
  let newItem: string = '';
  let currentStep: number = 1;
  let randomChoice: { text: string, color: string } | null = null;
  let rolling: boolean = false;
  let newItemInput: HTMLInputElement;
  let highlightedIndex: number | null = null;

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

  const addItem = () => {
    if (newItem.trim()) {
      items = [...items, { text: newItem, color: '' }];
      newItem = '';
      newItemInput.focus(); // Focus the input element
      updateColors();
    }
  };

  const deleteItem = (index: number) => {
    items = items.filter((_, i) => i !== index);
    updateColors();
  };

  const editItem = (index: number, newValue: string) => {
    items = items.map((item, i) => i === index ? { ...item, text: newValue } : item);
  };

  const clearItems = () => {
    items = [];
    randomChoice = null;
    currentStep = 1;
  };

  const clearOptions = () => {
    items = [];
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
      alert('No items to choose from.');
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      addItem();
    }
  };

  const backToOptions = () => {
    currentStep = 1;
    randomChoice = null;
    highlightedIndex = null;
  };
</script>

{#if currentStep === 1}
  <div>
    <h2>Step 1: Create Options</h2>
    <div id="new_item_container">
    <input
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
            type="text"
            bind:value={items[index].text}
            on:input={(e) => editItem(index, e.target.value)}
            style="background-color: {color}; color: white;"
          />
          <button on:click={() => deleteItem(index)}>Delete</button>
        </li>
      {/each}
    </ul>

    <div class="controls">
      <div class="button-group">
        <button on:click={throwDice}>Throw Dice!</button>
        <button on:click={clearOptions}>Clear Options</button>
      </div>
    </div>
  </div>
{:else if currentStep === 2}
  <div>
    <h2>Step 2: Throwing Dice</h2>
    <div class="controls">
      <button on:click={backToOptions}>Cancel</button>
    </div>
    <p>The dice is being thrown...</p>
    <ul>
      {#each items as { text, color }, index}
        <li class="{highlightedIndex === index ? 'highlighted' : ''}" style="background-color: {color};">
          {text}
        </li>
      {/each}
    </ul>
  </div>
{:else if currentStep === 3}
  <div>
    <h2>Step 3: Result</h2>
    {#if items.length > 1}
      <p>The random choice is: <span style="background-color: {randomChoice.color}; color: white; padding: 0.2em; border-radius: 3px;">{randomChoice.text}</span></p>
    {:else}
      <p>There must be at least two options.</p>
    {/if}

    <div class="controls">
      <button on:click={backToOptions}>Modify Options</button>
      <button on:click={clearItems}>Start Over</button>
    </div>
    <ul>
      {#each items as { text, color }, index}
        <li class="{randomChoice && randomChoice.text === text ? 'highlighted' : ''}" style="background-color: {color};">
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
    justify-content: center;
    margin-top: 1em;
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
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
    margin: 8px;
  }
</style>
