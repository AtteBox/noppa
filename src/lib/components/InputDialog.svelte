<script lang="ts">
    import { tick } from "svelte";

  let isOpen = false;
  let msg = "";
  let defaultValue = "";

  let inputValue = defaultValue;
  let resolve: (value: string | null) => void;

  export function open(
    message: string,
    defaultValue: string = ""
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

	async function autofocus(el: HTMLElement) {
		await tick();
		el.focus();
	}
</script>

{#if isOpen}
  <div class="modal-backdrop">
    <div
      class="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="input-dialog-message"
    >
      <p id="input-dialog-message">{msg}</p>
      <input
        type="text"
        bind:value={inputValue}
        aria-labelledby="input-dialog-message"
      />
      <div class="modal-buttons">
        <button class="primary" on:click={submit}>OK</button>
        <button on:click={cancel}>Cancel</button>
      </div>
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
    margin-top: 2rem;
  }
</style>
