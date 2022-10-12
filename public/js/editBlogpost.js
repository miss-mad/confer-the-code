// Function to handle when a user updates a blogpost
const updateFormHandler = async (event) => {
  event.preventDefault();

  // Retrieve the blogpost name
  const blogpost_name = document.querySelector("#blogpost-name").value.trim();

  // Retrieve the blogpost description
  const blogpost_description = document
    .querySelector("#blogpost-desc")
    .value.trim();

    // Find the blogpost id and the user id
    let blogpost_id = document.getElementById("user_id").getAttribute("data-blogpost-id")
    let user_id = document.getElementById("user_id").getAttribute("data-user-id")


  // If this data is found, then execute this fetch request to put (update) to the route listed, first turning the data into a string
  if (blogpost_name && blogpost_description) {
    const response = await fetch(`/api/blogposts/${blogpost_id}`, {
      method: "PUT",
      body: JSON.stringify({
        blogpost_name,
        blogpost_description,
        user_id: parseInt(user_id)
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
      alert("There was an error updating your blogpost");
    }
  }
};

// Click listener to fire the updateFormHandler() function once the Update button is clicked
document
  .querySelector(".update-blogpost")
  .addEventListener("click", updateFormHandler);
