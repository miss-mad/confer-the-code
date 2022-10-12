const updateFormHandler = async (event) => {
  event.preventDefault();

  const blogpost_name = document.querySelector("#blogpost-name").value.trim();

  const blogpost_description = document
    .querySelector("#blogpost-desc")
    .value.trim();



    let blogpost_id = document.getElementById("user_id").getAttribute("data-blogpost-id")
    let user_id = document.getElementById("user_id").getAttribute("data-user-id")


  if (blogpost_name && blogpost_description) {
    const response = await fetch(`/api/blogposts/${blogpost_id}`, {
      method: "PUT",
      body: JSON.stringify({
        blogpost_name,
        blogpost_description,
        user_id: parseInt(user_id)
      }),

      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("There was an error updating your blogpost");
    }
  }
};

document
  .querySelector(".update-blogpost")
  .addEventListener("click", updateFormHandler);
