<script lang="ts">
  let isOpen = $state(false);
  let _message = $state("");

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
  <div class="modal-backdrop">
    <div
      class="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="input-dialog-message"
    >
      <p id="input-dialog-message">{_message}</p>
      <div class="modal-buttons">
        <button class="destructive" onclick={confirm}>Yes</button>
        <button onclick={cancel}>No</button>
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
