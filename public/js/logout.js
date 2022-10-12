// Function to handle when a user logs out
const logout = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  // If user presses the logout button, redirect them to the homepage that shows all blogposts without any login necessary
  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
};

// Click listener to fire the logout() function once the Logout button is clicked on main.handlebars
document.querySelector("#logout").addEventListener("click", logout);
