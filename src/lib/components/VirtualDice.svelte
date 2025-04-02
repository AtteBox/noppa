<script lang="ts">
  import { run } from 'svelte/legacy';

  import type { IOption } from "../domain/options";
  import type { IPrefilledOptionLists } from "../domain/prefilledOptions";
  import { generateDistinctColors } from "../domain/colors";
  import {
    PREFILLED_OPTIONS,
    UserPrefilledOptionPersistence
  } from "../domain/prefilledOptions";
  import ConfirmDialog from "./ConfirmDialog.svelte";
  import InputDialog from "./InputDialog.svelte";
  import OptionList from "./OptionList.svelte";
  import PrefilledOptionList from "./PrefilledOptionList.svelte";
  let confirmDialog: ConfirmDialog = $state();
  let inputDialog: InputDialog = $state();

  const Steps = {
    DefineOptions: 1,
    ThrowingDice: 2,
    Result: 3
  } as const;
  type IStep = (typeof Steps)[keyof typeof Steps];

  let options: IOption[] = $state([]);
  let newOptionText: string = $state("");
  let currentStep: IStep = $state(Steps.DefineOptions);
  let randomResultOption: IOption | null = $state(null);
  let newOptionInput: HTMLInputElement = $state();
  let animationShownOption: IOption | null = $state(null);
  let userPrefilledOptions: IPrefilledOptionLists =
    $state(UserPrefilledOptionPersistence.load());




  function updateColors() {
    const colors = generateDistinctColors(options.length);
    options = options.map((option, index) => ({
      ...option,
      color: colors[index]
    }));
  }

  function saveUserPrefilledOptions(name: string, options: string[]) {
    if (name.trim()) {
      userPrefilledOptions = { ...userPrefilledOptions, [name]: options };
    }
  }

  async function deleteUserPrefilledOptions(name: string) {
    const isConfirmed = await confirmDialog.open(
      `Are you sure you want to delete the custom option: "${name}"?`,
    );
    if (isConfirmed) {
      userPrefilledOptions = Object.fromEntries(
        Object.entries(userPrefilledOptions).filter(([key]) => key !== name),
      );
    }
  }

  async function saveOptionsAsUserPrefilledOptions() {
    const name = await inputDialog.open(
      "Enter a name for your prefilled options:",
    );
    if (name) {
      saveUserPrefilledOptions(
        name,
        options.map((item) => item.text),
      );
    }
  }

  const addOption = () => {
    if (newOptionText.trim()) {
      options = [...options, { text: newOptionText, color: "" }];
      newOptionText = "";
      newOptionInput.focus();
    }
  };

  const setOptions = (selectedOptions: string[]) => {
    options = selectedOptions.map((text) => ({ text, color: "" }));
  };

  const clearOptions = () => {
    options = [];
  };

  const startOver = () => {
    clearOptions();
    currentStep = Steps.DefineOptions;
  };

  const backToOptions = () => {
    currentStep = Steps.DefineOptions;
  };

  const throwDice = () => {
    if (options.length === 0) {
      console.warn("throwDice: No options to choose from.");
      return;
    }

    currentStep = Steps.ThrowingDice;
    const rollDuration = 3000;
    const diceAnimationInterval = 200;
    const startTime = Date.now();

    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * options.length);
      animationShownOption = options[randomIndex];

      if (Date.now() - startTime > rollDuration) {
        clearInterval(intervalId);
        randomResultOption = options[randomIndex];
        currentStep = Steps.Result;
      }
    }, diceAnimationInterval);
  };

  const handleNewOptionKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      addOption();
    }
  };
  run(() => {
    UserPrefilledOptionPersistence.save(userPrefilledOptions);
  });
  run(() => {
    if (options.length) {
      updateColors();
    }
  });
  run(() => {
    if (currentStep === Steps.DefineOptions) {
      randomResultOption = null;
      animationShownOption = null;
    }
  });
</script>

<div class="breadcrumb">
  <span class={currentStep === Steps.DefineOptions ? "active" : ""}
    >1. Define Options</span
  >
  <span class={currentStep === Steps.ThrowingDice ? "active" : ""}
    >2. Throwing Dice</span
  >
  <span class={currentStep === Steps.Result ? "active" : ""}>3. Result</span>
</div>

{#if currentStep === Steps.DefineOptions}
  <div>
    <div id="new-option-container">
      <input
        id="new-option-input"
        class="option-input"
        type="text"
        bind:value={newOptionText}
        placeholder="New Option"
        bind:this={newOptionInput}
        onkeydown={handleNewOptionKeyDown}
        aria-label="New Option Text"
      />
      <button onclick={addOption}>Add Option</button>
    </div>

    <OptionList bind:options />

    <div class="controls">
      <div class="button-group">
        {#if options.length > 1}
          <button class="primary" onclick={throwDice}>Throw Dice!</button>
          <button onclick={saveOptionsAsUserPrefilledOptions}
            >Save Options</button
          >
        {/if}
        <button class="destructive-button" onclick={clearOptions}
          >Clear Options</button
        >
      </div>
    </div>

    <div class="prefilled-options">
      <h3>Prefilled Options:</h3>
      <PrefilledOptionList
        prefilledOptions={PREFILLED_OPTIONS}
        {userPrefilledOptions}
        {setOptions}
        {deleteUserPrefilledOptions}
      />
    </div>
  </div>
{:else if currentStep === Steps.ThrowingDice && animationShownOption}
  <div>
    <p>
      <span
        style="background-color: {animationShownOption.color};"
        class="highlighted-choice">{animationShownOption.text}</span
      >
    </p>
  </div>
{:else if currentStep === Steps.Result && randomResultOption}
  <div>
    <p>
      <span
        style="background-color: {randomResultOption.color};"
        class="highlighted-choice">{randomResultOption.text}</span
      >
    </p>
    <div class="controls">
      <button class="primary" onclick={backToOptions}>Modify Options</button>
      <button onclick={throwDice}>Rethrow Dice</button>
      <button class="destructive-button" onclick={startOver}>Start Over</button
      >
      <button onclick={saveOptionsAsUserPrefilledOptions}>Save Options</button>
    </div>
  </div>
{/if}

<ConfirmDialog bind:this={confirmDialog} />
<InputDialog bind:this={inputDialog} isRequired={true} />

<style>
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
