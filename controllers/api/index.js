// think of the front end
// show all the blogposts assoc with one logged in user = one route

// routes are based on whoever is logged in
// routes folder for blogposts

// need a login/logout route
// maybe need a signup route?

// users:
// get all users
// post a user
// update a user
// delete a user - don't need

// comments:
// post a comment
// update a comment
// delete a comment

// don't need:
// get all users
// get all comments

// This index.js directs the computer to know which API routes to find in which folders (like a store greeter or a phone operator)
const router = require("express").Router();
const blogpostRoutes = require("./blogpost-routes");
const commentRoutes = require("./comment-routes");
const userRoutes = require("./user-routes");

router.use("/blogposts", blogpostRoutes);
router.use("/comments", commentRoutes);
router.use("/users", userRoutes);

module.exports = router;
