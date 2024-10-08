const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const signInBtn = document.querySelector('.sign-in-btn'); // Get the sign-in button
const emailInput = document.querySelector('.sign-in input[type="email"]');
const passwordInput = document.querySelector('.sign-in input[type="password"]');

// Toggle the Sign Up/Sign In form
registerBtn.addEventListener('click', () => {
  container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
  container.classList.remove("active");
});

// Sign In button animation and validation
signInBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  const enteredEmail = emailInput.value;
  const enteredPassword = passwordInput.value;

  // Dummy validation removed
  // Handle login with actual credentials
  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: enteredEmail, password: enteredPassword })
    });

    if (!response.ok) {
      signInBtn.classList.add('move');
      throw new Error(await response.text());
    }

    alert('Login successful!');
    signInBtn.classList.remove('move'); // Stop the animation
    window.location.href = '/dashboard.html'; // Redirect to the dashboard page

  } catch (error) {
    alert(error.message);
  }
});

passwordInput.addEventListener('input', () => {
  if (passwordInput.value === '') {
    // Stop the animation if the password input field is empty
    signInBtn.classList.remove('move');
  }
});

// Handle sign-up form submission
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(signupForm);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    alert('Account created successfully!');
    container.classList.remove('active'); // Switch to login form after successful sign-up
  } catch (error) {
    alert(error.message);
  }
});

// Handle login form submission
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(loginForm);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const user = await response.json();
    alert(`Welcome, ${user.name}!`);
    window.location.href = '/dashboard.html'; // Redirect to the dashboard page
  } catch (error) {
    alert(error.message);
  }
});
