<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import VirtualDice from './lib/VirtualDice.svelte'
</script>

<main>
  <h1>Noppa: A virtual Dice</h1>

  <div class="card">
    <VirtualDice />
  </div>

  <p class="read-the-docs">
    A PWA app for rolling a virtual dice.
  </p>
</main>

<style>
  .read-the-docs {
    color: #888;
  }
</style>
