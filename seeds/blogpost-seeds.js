const { Blogpost } = require("../models");

const blogpostData = [
  // Do not need date_created key value pair because the sequelize table automatically creates timestamps
  {
    blogpost_name: "Blog post 1",
    blogpost_description: "Description1",
    user_id: 1,
  },
  {
    blogpost_name: "Blog post 2",
    blogpost_description: "Description2",
    user_id: 2,
  },
  {
    blogpost_name: "Blog post 3",
    blogpost_description: "Description3",
    user_id: 3,
  },
  {
    blogpost_name: "Blog post 4",
    blogpost_description: "Description4",
    user_id: 4,
  },
  {
    blogpost_name: "Blog post 5",
    blogpost_description: "Description5",
    user_id: 5,
  },
];

const seedBlogposts = () => Blogpost.bulkCreate(blogpostData);

module.exports = seedBlogposts;
