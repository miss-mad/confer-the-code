// This js file assists with the dashboard handlebars page

// Function to handle when a user posts a new blogpost
const newFormHandler = async (event) => {
  console.log("newFormHandler function works");
  event.preventDefault();

  // Retrieve the blogpost name
  const blogpost_name = document.querySelector("#blogpost-name").value.trim();

  // Retrieve the blogpost description
  const blogpost_description = document
    .querySelector("#blogpost-desc")
    .value.trim();

  // If both parts of the form are complete (blog has a name and a description), then execute this fetch request to post to the route listed, first turning the data into a string
  if (blogpost_name && blogpost_description) {
    const response = await fetch("/api/blogposts", {
      method: "POST",
      body: JSON.stringify({
        blogpost_name,
        blogpost_description,
      }),

      // Let it know we're sending json
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);

    // If successful, replace the URL path with the dashboard to redirect the user to the dashboard page; otherwise, give an error message
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("There was an error making your blogpost");
    }
  }
};

// Function to handle when a user deletes a blogpost
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    // Retrieve the blogpost id
    const id = event.target.getAttribute("data-id");

    // Execute this fetch request to delete the data in the route listed
    const response = await fetch(`/api/blogposts/${id}`, {
      method: "DELETE",
    });

    // If successful, replace the URL path with the dashboard to redirect the user to the dashboard page; otherwise, give an error message
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("There was an error deleting your blogpost");
    }
  }
};

// Click listener to fire these functions once the appropriate buttons are clicked
document
  .querySelector(".create-blogpost")
  .addEventListener("click", newFormHandler);

document.querySelectorAll(".delete-blogpost").forEach((node) => {
  node.addEventListener("click", delButtonHandler);
});
