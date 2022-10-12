const commentFormHandler = async (event) => {
  event.preventDefault();

  console.log("Comment");

  const comment_name = document.querySelector("#comment-name").value.trim();

  console.log("Comment name : ", comment_name);

  //  {
  //     "content": "Comment here6",
  //     "blogpost_id": 2,
  //     "user_id": 2
  //  }

  let blogpost_id = document
    .getElementById("user_id")
    .getAttribute("data-blogpost-id");

  let user_id = document.getElementById("user_id").getAttribute("data-user-id");

  if (comment_name) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({
        content: comment_name,
        blogpost_id: parseInt(blogpost_id),
      }),

      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response);

    if (response.ok) {
      document.location.reload()
    } else {
      alert("There was an error updating your blogpost");
    }
  }
};

document
  .querySelector(".create-comment")
  .addEventListener("click", commentFormHandler);
