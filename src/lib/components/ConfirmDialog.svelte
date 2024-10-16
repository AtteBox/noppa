<script lang="ts">
  let isOpen = false;
  let _message = "";

  let resolve: (result: boolean) => void;

  export function open(message: string): Promise<boolean> {
    _message = message;
    isOpen = true;
    return new Promise((res) => {
      resolve = res;
    });
  }

  function confirm() {
    resolve(true);
    isOpen = false;
  }

  function cancel() {
    resolve(false);
    isOpen = false;
  }
</script>

{#if isOpen}
  <div class="modal-backdrop" aria-hidden="true">
    <div
      class="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="input-dialog-message"
    >
      <p id="input-dialog-message">{_message}</p>
      <div class="modal-buttons">
        <button class="destructive" on:click={confirm}>Yes</button>
        <button on:click={cancel}>No</button>
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
  }
</style>
