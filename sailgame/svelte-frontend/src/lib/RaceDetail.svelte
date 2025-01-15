<script>
  export let race;
  export let onBack;
</script>

<div>
  <button on:click={onBack}>← Back</button>
  <h2>{race.name}</h2>
  <p>Race details will go here...</p>
</div>
