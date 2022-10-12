const { User } = require("../models");

const userData = [
  {
    username: "user1",
    password: "password1",
  },
  {
    username: "user2",
    password: "password2",
  },
  {
    username: "user3",
    password: "password3",
  },
  {
    username: "user4",
    password: "password4",
  },
  {
    username: "user5",
    password: "password5",
  },
];

const seedUsers = () => User.bulkCreate(userData, {
  // Use the hooks defined in the User model so that the user passwords can be hashed correctly by bcrypt
  individualHooks: true,
  returning: true,
});

module.exports = seedUsers;
