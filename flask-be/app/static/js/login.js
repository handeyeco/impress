// When document is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Grab HTML elements
  let username      = document.getElementById('username');
  let password      = document.getElementById('password');
  let submit        = document.getElementById('submit');
  let errorDisplay  = document.getElementById('error');

  // When user gets to password field and starts typing
  password.addEventListener('input', () => {
    // Check if username or password has an error
    let error = inputError(username.value) || inputError(password.value);
    // If error, display it to user...
    errorDisplay.innerHTML = error ? error : '';
    // ...and disable submit button
    submit.disabled = !!error
  });
});

// Accepts string; returns error as string or false if no error
function inputError(input) {
  // Make sure we're dealing with a string
  input = String(input);

  if (!input) {
    // Check if field is empty
    return 'Username and password are required';
  } else if (input.length > 16) {
    // Check if too long
    return 'Username and password cannot exceed 16 characters';
  } else if (/[^A-Za-z0-9\$\_\#\.]/.test(input)) {
    // Check if user is inputing unacceptable characters
    return 'Username and password must consist of letters, numbers, and special characters: $#_.';
  }

  return false;
}
