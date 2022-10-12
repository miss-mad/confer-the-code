// Function to handle when a user logs in
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form: username and password
  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  // Send a POST request to the API endpoint if both username and password are completed by user
  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    // If successful, redirect the browser to the homepage page (/)
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

// Function to handle when a user signs up
const signupFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the signup form: username and password
  //   const name = document.querySelector("#name-signup").value.trim();
  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  // Send a POST request to the API endpoint if both username and password are completed by user
  if (username && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    // If successful, redirect the browser to the homepage page (/)
    if (response.ok) {
      console.log("signupFormHandler function is ok and working");
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

// Click listener to fire these functions once the appropriate buttons are clicked
document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
