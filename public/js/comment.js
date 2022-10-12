// Function to handle when a user posts a comment
const commentFormHandler = async (event) => {
  event.preventDefault();

  console.log("Comment");

  // Grab the comment name from the front end (blogpost.handlebars)
  const comment_name = document.querySelector("#comment-name").value.trim();

  console.log("Comment name : ", comment_name);

  //  {
  //     "content": "Comment here6",
  //     "blogpost_id": 2,
  //     "user_id": 2
  //  }

  // Identify the blogpost and user the comment belongs to
  let blogpost_id = document
    .getElementById("user_id")
    .getAttribute("data-blogpost-id");

  let user_id = document.getElementById("user_id").getAttribute("data-user-id");

  // If there is comment content, execute a fetch request to post to the listed route, first turning the data into a string
  if (comment_name) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({
        content: comment_name,
        blogpost_id: parseInt(blogpost_id),
      }),

      // Let it know we're sending json
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response);

    // If successful, simply reload the page to show the new comment; otherwise give an error message
    if (response.ok) {
      document.location.reload()
    } else {
      alert("There was an error updating your blogpost");
    }
  }
};

// Click listener to fire the commentFormHandler() function once the Submit Comment button is clicked
document
  .querySelector(".create-comment")
  .addEventListener("click", commentFormHandler);
