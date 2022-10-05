// npm run seed runs this file to seed each table in the blogpost database

// Import all 3 seeds.js files
const seedBlogposts = require("./blogpost-seeds");
const seedComments = require("./comment-seeds");
const seedUsers = require("./user-seeds");

// Use the sequelize connection from the connection.js file
const sequelize = require("../config/connection");

// Function expression to seed all 3 tables using async/await, then logging a message in the terminal once done
const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  await seedBlogposts();
  console.log("\n----- BLOGPOSTS SEEDED -----\n");

  await seedComments();
  console.log("\n----- COMMENTS SEEDED -----\n");

  await seedUsers();
  console.log("\n----- USERS SEEDED -----\n");

  process.exit(0);
};

// To start seeding function
seedAll();
