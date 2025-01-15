<script>
  import { onMount } from "svelte";
  import Auth from "./lib/Auth.svelte";
  import GameHome from "./lib/GameHome.svelte";
  import RaceDetail from "./lib/RaceDetail.svelte";
  import { supabase } from "./lib/supabaseClient";

  let user = null;
  let selectedRace = null;

  onMount(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log(
        "Initial session check:",
        session ? "Logged in" : "No session"
      );
      user = session?.user;
    });

    supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);
      user = session?.user;
    });
  });
</script>

<main>
  {#if !user}
    <Auth />
  {:else if selectedRace}
    <RaceDetail race={selectedRace} onBack={() => (selectedRace = null)} />
  {:else}
    <GameHome bind:selectedRace />
  {/if}
</main>

<style>
  main {
    max-width: 600px;
    margin: 40px auto;
    padding: 20px;
  }
</style>
