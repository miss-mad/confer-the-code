const { User } = require("../models");

const userData = [
  {
    username: "TechBlogger47",
    password: "TechBlogger47password",
  },
  {
    username: "C00lCoder",
    password: "C00lCoderpassword",
  },
  {
    username: "HelpfulHire2770",
    password: "HelpfulHire2770password",
  },
  {
    username: "_Computer_Elite_",
    password: "_Computer_Elite_password",
  },
  {
    username: "webdevfolife",
    password: "webdevfolifepassword",
  },
];

const seedUsers = () => User.bulkCreate(userData, {
  // Use the hooks defined in the User model so that the user passwords can be hashed correctly by bcrypt
  individualHooks: true,
  returning: true,
});

module.exports = seedUsers;
