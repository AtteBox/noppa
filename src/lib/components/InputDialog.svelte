<script lang="ts">
  import { preventDefault } from "svelte/legacy";
  import { t } from "../i18n/index.svelte";

  let isOpen = $state(false);
  let msg = $state("");

  let inputValue: string = $state("");
  let resolve: (value: string | null) => void;

  interface Props {
    isRequired?: boolean;
  }

  let { isRequired = false }: Props = $props();

  export function open(
    message: string,
    defaultValue: string = "",
  ): Promise<string | null> {
    msg = message;
    inputValue = defaultValue;
    isOpen = true;
    return new Promise((res) => {
      resolve = res;
    });
  }
  function submit() {
    resolve(inputValue);
    isOpen = false;
  }

  function cancel() {
    resolve(null);
    isOpen = false;
  }

  // TODO: validation message is initially shown when the input is required
  let showValidationError = $derived(!isRequired || !!inputValue);
</script>

{#if isOpen}
  <div class="modal-backdrop">
    <div
      class="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="input-dialog-message"
    >
      <form onsubmit={preventDefault(submit)}>
        <p id="input-dialog-message">{msg}</p>
        <input
          type="text"
          bind:value={inputValue}
          aria-labelledby="input-dialog-message"
          id="input-dialog-input"
          required={isRequired}
        />
        <span
          class="validation-error"
          style="visibility: {showValidationError ? 'hidden' : 'visible'}"
        >
          {t.pleaseEnterName}
        </span>
        <div class="modal-buttons">
          <button type="submit" class="primary">{t.ok}</button>
          <button onclick={cancel}>{t.cancel}</button>
        </div>
      </form>
    </div>
  </div>
{/if}

<style>
  .modal p {
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
  }

  .modal-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
  }

  .validation-error {
    color: red;
    font-size: 0.8rem;
  }
</style>
