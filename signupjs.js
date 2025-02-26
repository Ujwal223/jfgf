import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://tfilundrrvecqgcprffn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmaWx1bmRycnZlY3FnY3ByZmZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0NTM0MzUsImV4cCI6MjA1NjAyOTQzNX0.EOo75SGvzlMcVs-vByHHT6iQbqSmBAu0Il0vjsVZ3PM';


const supabase = createClient(supabaseUrl, supabaseKey);

const signupForm = document.querySelector("#signup-form"); 
signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    await signUp(email, password);
});

async function signUp(email, password) {
    const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });
    if (error) {
        document.getElementById("error-message").textContent = error.message;
        console.error('Signup error:', error);
    } else {
        console.log('Signed up user:', user);
    }
}

