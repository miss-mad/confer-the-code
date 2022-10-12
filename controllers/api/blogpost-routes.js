// blogposts:
// get all blogposts (incl user and comment)
// get a blogpost
// post a blogpost
// update a blogpost (put)
// delete a blogpost

const router = require("express").Router();
const { Blogpost, Comment, User } = require("../../models");

// "/api/blogposts" = endpoint
// http://localhost:3000/api/blogposts = route

// Get all blogposts
// POSTMAN - BLOGPOST: GET ALL http://localhost:3000/api/blogposts (get all blogposts)
router.get("/", (req, res) => {
  // Find all blogposts
  // Include associated User and Comment data
  // No request body
  Blogpost.findAll({
    include: [{ model: User }, { model: Comment }],
  }).then((allBlogposts) => {
    res.status(200).json(allBlogposts);
  });
});

// Get one blogpost
// POSTMAN - BLOGPOST: GET ONE http://localhost:3000/api/blogposts/2 (blogpost #2)
router.get("/:id", (req, res) => {
  // Find a single blogpost by its "id"
  // Include associated User and Comment data
  // No request body
  Blogpost.findOne({
    where: {
      id: req.params.id,
    },
    include: [{ model: User }, { model: Comment }],
  }).then((oneBlogpost) => {
    res.json(oneBlogpost);
  });
});

// Create new blogpost (shouldn't have comments yet)
// POSTMAN - BLOGPOST: POST http://localhost:3000/api/blogposts/ (blogpost #6)
router.post("/", (req, res) => {
  /* req.body should look like this...
      {
      "blogpost_name": "Blog post 6",
      "blogpost_description": "Description6",
      "user_id": 2
      }
    */
  const user_id = req.session.user_id;

  const payload = {
    ...req.body,
    user_id,
  };

  console.log("payload", payload);

  Blogpost.create(payload)
    .then((newBlogpost) => {
      res.status(200).json(newBlogpost);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// Update blogpost
// POSTMAN - BLOGPOST: PUT http://localhost:3000/api/blogposts/6 (update blog post 6 with something)
router.put("/:id", (req, res) => {
  // Update blogpost content
  /* req.body should look like this...
      {
      "blogpost_name": "Blog post 6 - updated",
      "blogpost_description": "NEW Description6",
      "user_id": 2
      }
    */

  console.log("params: ", req.params);
  console.log("body: ", req.body);

  Blogpost.update(req.body, {
    where: {
      id: req.params.id,
    },
  })

    .then((updatedBlogpost) => res.status(200).json(updatedBlogpost))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// Delete blogpost
// POSTMAN - BLOGPOST: DELETE http://localhost:3000/api/blogposts/6 (delete blog post 6)
router.delete("/:id", (req, res) => {
  // Delete one blogpost by its "id" value
  // No request body
  Blogpost.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedBlogpost) => {
      res.json(deletedBlogpost);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
