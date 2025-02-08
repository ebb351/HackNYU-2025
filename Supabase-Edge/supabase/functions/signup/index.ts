import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  try {
    // Ensure the environment variables are set
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return new Response(JSON.stringify({ error: "Missing Supabase credentials" }), { status: 500 });
    }

    // Initialize Supabase client using Service Role Key
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Parse request body
    const { username, fname, lname, email, phone_number, capital_one_id } = await req.json();

    if (!username || !email || !phone_number) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    // Create a new user in Supabase Auth
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email,
      password: crypto.randomUUID(), // Generate a random password
      email_confirm: true,
    });

    if (authError) {
      return new Response(JSON.stringify({ error: authError.message }), { status: 400 });
    }

    const auth_user_id = authUser.user?.id;

    // Insert user details into the `users` table
    const { error: userError } = await supabase.from("users").insert([
      {
        username,
        fname,
        lname,
        email,
        phone_number,
        capital_one_id,
        auth_user_id,
      },
    ]);

    if (userError) {
      return new Response(JSON.stringify({ error: userError.message }), { status: 400 });
    }

    return new Response(
      JSON.stringify({ message: "User created successfully", user_id: auth_user_id }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
});
