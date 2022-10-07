const { Blogpost } = require("../models");

const blogpostData = [
  {
    blogpost_name: "Blog post 1",
    blogpost_description: "Description",
    date_created: 2022-10-5,
    user_id: 1,
  },
  {
    blogpost_name: "Blog post 2",
    blogpost_description: "Description",
    date_created: 2022-10-5,
    user_id: 2,
  },
  {
    blogpost_name: "Blog post 3",
    blogpost_description: "Description",
    date_created: 2022-10-5,
    user_id: 3,
  },
  {
    blogpost_name: "Blog post 4",
    blogpost_description: "Description",
    date_created: 2022-10-5,
    user_id: 4,
  },
  {
    blogpost_name: "Blog post 5",
    blogpost_description: "Description",
    date_created: 2022-10-5,
    user_id: 5,
  },
];

const seedBlogposts = () => Blogpost.bulkCreate(blogpostData);

module.exports = seedBlogposts;
