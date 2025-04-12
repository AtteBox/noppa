<script lang="ts">
  import githubLogo from "./assets/github-mark-white.svg";
  import VirtualDice from "./lib/components/VirtualDice.svelte";
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
    <a
      href="https://github.com/AtteBox/noppa"
      title="Open code in Github"
      target="_blank"
      rel="noopener noreferrer"
      ><img id="github-link-logo" src={githubLogo} alt="Github logo" /></a
    >
  </p>
</footer>

<style>
  .read-the-docs {
    color: #888;
    margin-bottom: 2rem;
  }

  #github-link-logo {
    margin-top: -0.2rem;
    height: 1.5rem;
    margin-left: 0.8rem;
    vertical-align: middle;
  }

  footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    padding: 1rem;
  }
</style>
