const { Comment } = require("../models");

const commentData = [
  {
    content: "Fascinating!",
    blogpost_id: 1,
    user_id: 1,
  },
  {
    content: "This is great stuff. Thanks for posting.",
    blogpost_id: 2,
    user_id: 2,
  },
  {
    content: "Wow, interesting.....",
    blogpost_id: 3,
    user_id: 3,
  },
  {
    content: "I learned a ton!",
    blogpost_id: 4,
    user_id: 4,
  },
  {
    content: "I'm following this blog - keep up the helpful content!",
    blogpost_id: 5,
    user_id: 5,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
