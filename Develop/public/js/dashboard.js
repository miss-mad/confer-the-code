// This js file assists with the dashboard handlebars page

const newFormHandler = async (event) => {
  console.log("newFormHandler function works");
  event.preventDefault();

  const blogpost_name = document.querySelector("#blogpost-name").value.trim();

  const blogpost_description = document
    .querySelector("#blogpost-desc")
    .value.trim();

  if (blogpost_name && blogpost_description) {
    const response = await fetch("/api/blogposts", {
      method: "POST",
      body: JSON.stringify({
        blogpost_name,
        blogpost_description,
      }),

      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("There was an error making your blogpost");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/blogposts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("There was an error deleting your blogpost");
    }
  }
};

document
  .querySelector(".create-blogpost")
  .addEventListener("click", newFormHandler);

document.querySelectorAll(".delete-blogpost").forEach((node) => {
  node.addEventListener("click", delButtonHandler);
});
