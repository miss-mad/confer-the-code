const { Blogpost } = require("../models");

const blogpostData = [
  // Do not need date_created key value pair because the sequelize table automatically creates timestamps
  {
    blogpost_name: "Through the Eyes of Sequelize",
    blogpost_description: "What is object–relational mapping and how does it make my life better?",
    user_id: 1,
  },
  {
    blogpost_name: "No, SQL doesn't stand for 'squirrel'",
    blogpost_description: "What is a database and how do you manage it?",
    user_id: 2,
  },
  {
    blogpost_name: "Expressions with Express",
    blogpost_description: "A guide to the masterful middleware we all know and love",
    user_id: 3,
  },
  {
    blogpost_name: "Servers: Not the Restaurant Kind",
    blogpost_description: "What parts do Express and Node play?",
    user_id: 4,
  },
  {
    blogpost_name: "How to Handle Handlebars",
    blogpost_description: "Biking can lead us to beautiful places; similarly, HandlebarsJS gives us webpage views like never before",
    user_id: 5,
  },
];

const seedBlogposts = () => Blogpost.bulkCreate(blogpostData);

module.exports = seedBlogposts;
