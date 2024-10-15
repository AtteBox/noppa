<script lang="ts">
  import VirtualDice from "./lib/VirtualDice.svelte";
</script>

<main>
  <h1>Noppa 🎲</h1>

  <p class="read-the-docs">
    A dice for any options: A PWA app for randomly picking an option from a list
    which the user can enter.
  </p>
  <VirtualDice />
</main>
<footer>
  <p>
    © Atte Virtanen {new Date().getFullYear()}
  </p>
</footer>

<style>
  .read-the-docs {
    color: #888;
    margin-bottom: 2rem;
  }
</style>
