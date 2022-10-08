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
  Blogpost.create(req.body)
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
  Blogpost.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    // figure out rest of update
    .then((product) => {
      // Find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // Get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // Create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // Figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // Run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
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
