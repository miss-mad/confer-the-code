const router = require("express").Router();
const { Blogpost, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Each home route corresponds with a handlebars file

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
        {model: Comment}
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

    console.log(blogpost)

    res.render("blogpost", {
      ...blogpost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/blogpost/edit/:id", async (req, res) => {
  try {
    const blogpostData = await Blogpost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const blogpost = blogpostData.get({ plain: true });

    console.log(blogpost)

    res.render("edit", {
      ...blogpost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Dashboard - shows only the user's blogposts and those blogposts' comments
// Find all blogposts by user
// Use withAuth middleware to prevent access to route if user is not logged in
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    // const blogpostData = await Blogpost.findAll(
    //   { where: { user_id: req.session.user_id } },
    //   {
    //     include: [{ model: Comment }, {model: User}],
    //   }
    // );
    const blogpostData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [
        { model: Comment, attributes: ["content"] },
        {
          model: Blogpost,
        },
      ],
    });
    
    let tempblogpostData = blogpostData.get({plain: true})
    
        console.log("blogpostData: ", tempblogpostData)

    // console.log("blogpostData", blogpostData);
    res.render("dashboard", {
      ...tempblogpostData,
      logged_in: true,
    });
  } catch (err) {
    console.log(err);
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
