const router = require("express").Router();

const apiRoutes = require("./api");
// don't have homeRoutes yet but keep these lines
// const homeRoutes = require('./homeRoutes');

// router.use('/', homeRoutes);
router.use("/api", apiRoutes);

module.exports = router;
