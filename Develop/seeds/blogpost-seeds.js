const { Blogpost } = require("../models");

const blogpostData = [
  {
    blog_post_name: "Blog post 1",
    blog_post_description: "Description",
    date_created: 2022-10-5,
    user_id: 1,
  },
  {
    blog_post_name: "Blog post 2",
    blog_post_description: "Description",
    date_created: 2022-10-5,
    user_id: 2,
  },
  {
    blog_post_name: "Blog post 3",
    blog_post_description: "Description",
    date_created: 2022-10-5,
    user_id: 3,
  },
  {
    blog_post_name: "Blog post 4",
    blog_post_description: "Description",
    date_created: 2022-10-5,
    user_id: 4,
  },
  {
    blog_post_name: "Blog post 5",
    blog_post_description: "Description",
    date_created: 2022-10-5,
    user_id: 5,
  },
];

const seedBlogposts = () => Blogpost.bulkCreate(blogpostData);

module.exports = seedBlogposts;
