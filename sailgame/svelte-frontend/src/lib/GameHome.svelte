<script>
  import { supabase } from "./supabaseClient";
  import { races, fetchRaces } from "./stores/raceStore";

  export let selectedRace;

  async function initRaces() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if ($races.length === 0) {
      await fetchRaces(session);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    races.set([]); // Clear races on logout
  }

  initRaces();
</script>

<div>
  <div class="header">
    <h2>Available Races</h2>
    <button on:click={handleLogout}>Logout</button>
  </div>

  {#each $races as race}
    <div class="race-item">
      <span>{race.name}</span>
      <button on:click={() => (selectedRace = race)}>View</button>
    </div>
  {/each}
</div>

<style>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .race-item {
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
