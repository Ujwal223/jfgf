import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tfilundrrvecqgcprffn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmaWx1bmRycnZlY3FnY3ByZmZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0NTM0MzUsImV4cCI6MjA1NjAyOTQzNX0.EOo75SGvzlMcVs-vByHHT6iQbqSmBAu0Il0vjsVZ3PM';

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Get the form element for file upload
const fileUpload = document.querySelector('#upload-form');

// Add event listener for form submission
fileUpload.addEventListener("submit", async (e) => {
  e.preventDefault();

  const file = document.querySelector('#file').files[0];  // Get the file from the input
  if (!file) {
    alert('Please select a file to upload!');
    return;
  }

  const filePath = `test/${file.name}`;  // Define the path for the file in the bucket

  try {
    // Upload the file to Supabase storage
    const { data, error } = await supabase
      .storage
      .from('test')  // Specify your storage bucket name
      .upload(filePath, file);

    // If there's an error uploading the file, throw it
    if (error) {
      throw error;
    }

    // Success - log data and give user feedback
    console.log('File uploaded successfully:', data);
    document.getElementById("success-message").textContent = 'File uploaded successfully!';
  } catch (error) {
    // Handle any errors that occurred during the upload
    console.error('Error uploading file:', error);
    document.getElementById("error-message").textContent = 'Error: ' + error.message;
  }
});
