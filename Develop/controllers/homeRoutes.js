const router = require("express").Router();
const { Blogpost, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Homepage shows all the blogposts and all of the blogposts' comments
// Blogpost page shows existing blogposts (by blogpost id)
// Dashboard shows only the user's blogposts and those blogposts' comments
// Login redirects to user's dashboard page

// Homepage - needs to show all the blogposts and all of the blogposts' comments
router.get("/", async (req, res) => {
  try {
    // Get all blogpost and JOIN with user data
    const blogpostData = await Blogpost.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogposts = blogpostData.map((blogpost) =>
      blogpost.get({ plain: true })
    );

    // Pass serialized data and session flag into template
    res.render("homepage", {
      blogposts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Blogpost page - shows existing blogposts (by blogpost id)
router.get("/blogpost/:id", async (req, res) => {
  try {
    const blogpostData = await Blogpost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        { model: Comment },
      ],
    });

    const blogpost = blogpostData.get({ plain: true });

    res.render("blogpost", {
      ...blogpost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Dashboard - shows only the user's blogposts and those blogposts' comments
// Find all blogposts by user
// Use withAuth middleware to prevent access to route
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const blogpostData = await Blogpost.findAll(
      { where: { product_id: req.params.id } },
      {
        include: [
          { model: Comment },
          { model: User, attributes: ["username"] },
        ],
      }
    );

    const blogpost = blogpostData.get({ plain: true });

    res.render("dashboard", {
      ...blogpost,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Once user is logged in, redirect to their dashboard which shows their own blogposts and those blogposts' comments
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to their dashboard to show their own blogposts
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

module.exports = router;
