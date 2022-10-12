// users:
// get all users - don't need
// get one user
// create user
// update a user - don't need
// delete a user - don't need

const router = require("express").Router();
const { User, Blogpost, Comment } = require("../../models");

// "/api/users" = endpoint
// http://localhost:3000/api/users = route

// DONT NEED
// Get all users
// POSTMAN - USER: GET ALL http://localhost:3000/api/users (get all users)
// router.get("/", (req, res) => {
//   // Find all users
//   // Be sure to include its associated Blogpost and Comment data
//   // No request body
//   User.findAll({
//     include: [{ model: Blogpost }, { model: Comment }],
//   }).then((allUserData) => {
//     res.status(200).json(allUserData);
//   });
// });

// Get one user
// POSTMAN - USER: GET ONE http://localhost:3000/api/users/2 (user2)
router.get("/:id", (req, res) => {
  // Find a single user by its "id"
  // Be sure to include its associated Blogpost data
  // No request body
  User.findOne({
    where: {
      id: req.params.id,
    },
    include: [{ model: Blogpost }, { model: Comment }],
  }).then((oneUserData) => {
    res.json(oneUserData);
  });
});

// Create new user
// Made when a user logs in or signs up
// POSTMAN - USER: POST http://localhost:3000/api/users/ (user 6)
router.post("/", (req, res) => {
  /* req.body should look like this...
    {
      "username": "user6",
      "password": "password6"
    }
    */
  User.create(req.body)
    .then((newUser) => {
      req.session.save(() => {
        req.session.user_id = newUser.id;
        req.session.logged_in = true;
        res.status(200).json(newUser);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// DONT NEED
// Update user
// POSTMAN - USER: PUT http://localhost:3000/api/users/6 ()
// router.put("/:id", (req, res) => {
//   // Update a user's name by its "id" value
//   /* req.body should look like this...
//       {
//       "username": "user6 - updated",
//       "password": "passwordUpdated"
//     }
//     */
//   User.update(
//     { username: req.body.username },
//     { password: req.body.password },
//     { where: { id: req.params.id } }
//   )
//     .then((updatedUser) => {
//       res.status(200).json(updatedUser);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json(err);
//     });
// });

// don't need delete user because we don't want users deleting each other
// don't need "delete account" functionality

// DONT NEED
// Delete user
// POSTMAN - USER: DELETE http://localhost:3000/api/users/6 (user 6)
// router.delete("/:id", (req, res) => {
//   // Delete on user by its "id" value
//   // No request body
//   User.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((deletedUser) => {
//       res.json(deletedUser);
//     })
//     .catch((err) => res.json(err));
// });

// Need login route
router.post("/login", async (req, res) => {
  /* req.body should look like this...
    {
      "username": "user6",
      "password": "password6"
    }
    */

  try {
    let userData = await User.findOne({
      where: { username: req.body.username },
    });
    // If statement to check if the user inputted a username
    if (!userData) {
      res
        .status(400)
        .json({ message: "No valid username or password. Try again" });
      return;
    }
    console.log("userData", userData)

    // If statement to check if the password fits the criteria outlined in the User model of being at least 9 characters
    const validPassword = userData.checkPassword(req.body.password);
    // console.log("validPassword", validPassword)
    if (!validPassword) {
      res.status(400).json({ message: "Not a valid password. Try again" });
      return;
    }

    // Save the login info
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res
        .status(200)
        .json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Need logout route
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    // .destroy is an express-session method that means the session will be destroyed when the response ends
    req.session.destroy(() => {
      // .end is an express method that ends the response process
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
