<script>
  import { supabase } from "./supabaseClient";

  let email = "";
  let password = "";
  let errorMsg = "";

  async function handleSignUp(e) {
    e.preventDefault();
    console.log("Frontend: Attempting signup...");
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      console.error("Frontend: Signup error:", error.message);
      errorMsg = error.message;
    } else {
      console.log("Frontend: Signup success, check email");
      errorMsg = "Check your email for confirmation link";
    }
  }

  async function handleSignIn(e) {
    e.preventDefault();
    console.log("Frontend: Attempting signin...");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Frontend: Signin error:", error.message);
      errorMsg = error.message;
    } else {
      console.log("Frontend: Signin success:", data.user.email);
    }
  }
</script>

<form>
  <input bind:value={email} type="email" placeholder="Email" required />
  <input
    bind:value={password}
    type="password"
    placeholder="Password"
    required
  />
  <button type="submit" on:click={handleSignUp}>Sign Up</button>
  <button type="button" on:click={handleSignIn}>Sign In</button>
  {#if errorMsg}
    <p style="color: red">{errorMsg}</p>
  {/if}
</form>
