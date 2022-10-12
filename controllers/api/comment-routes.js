// comments:
// get all comments assoc with blogpost
// get one comment assoc with blogpost - don't need
// post a comment
// update a comment
// delete a comment

const router = require("express").Router();
const { Comment, Blogpost, User } = require("../../models");

// "/api/comments" = endpoint
// http://localhost:3000/api/comments = route

// Get all comments
// POSTMAN - COMMENT: GET ALL http://localhost:3000/api/comments (get all comments)
router.get("/", (req, res) => {
  // Find all comments
  // Be sure to include its associated Blogpost and Comment data
  // No request body
  Comment.findAll({
    include: [{ model: Blogpost }, { model: User }],
  }).then((allCommentData) => {
    res.status(200).json(allCommentData);
  });
});

// DONT NEED
// Get one comment
// POSTMAN - COMMENT: GET ONE http://localhost:3000/api/comments/2 (user2)
// router.get("/:id", (req, res) => {
//   // Find a single user by its "id"
//   // Be sure to include its associated Blogpost data
//   // No request body
//   Comment.findOne({
//     where: {
//       id: req.params.id,
//     },
//     include: [{ model: Blogpost }, { model: User }],
//   }).then((oneCommentData) => {
//     res.json(oneCommentData);
//   });
// });

// Create new comment
// Made when a comment logs in or signs up
// POSTMAN - COMMENT: POST http://localhost:3000/api/comments/ (comment 6)
router.post("/", (req, res) => {
  /* req.body should look like this...
    {
    "content": "Comment here6",
    "blogpost_id": 2,
    "user_id": 2
}
    */

  const user_id = req.session.user_id;

  const payload = { ...req.body, user_id };

  Comment.create(payload)
    .then((newComment) => {
      res.status(200).json(newComment);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// Update comment
// POSTMAN - COMMENT: PUT http://localhost:3000/api/comments/6 ()
router.put("/:id", (req, res) => {
  // Update a comment's name by its "id" value
  /* req.body should look like this...
      {
    "content": "Comment here6 - updated",
    "blogpost_id": 2,
    "user_id": 2
}
    */
  Comment.update({ where: { id: req.params.id } })
    .then((updatedComment) => {
      res.status(200).json(updatedComment);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// Delete comment
// POSTMAN - COMMENT: DELETE http://localhost:3000/api/comment/6 (user 6)
router.delete("/:id", (req, res) => {
  // Delete on comment by its "id" value
  // No request body
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedComment) => {
      res.json(deletedComment);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
