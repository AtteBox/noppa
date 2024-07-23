<script lang="ts">
  import VirtualDice from './lib/VirtualDice.svelte'
</script>

<main>
  <h1>Noppa 🎲 — A Virtual Dice</h1>

  <div class="card">
    <VirtualDice />
  </div>

  <p class="read-the-docs">
    A dice for any options: An app (PWA) for randomly picking an option from a a list which the user can enter.
  </p>
</main>

<style>
  .read-the-docs {
    color: #888;
  }
</style>
