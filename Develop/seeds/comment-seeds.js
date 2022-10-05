const { Comment } = require("../models");

const commentData = [
  {
    content: "Comment here",
    blogpost_id: 1,
    user_id: 1,
  },
  {
    content: "Comment here",
    blogpost_id: 2,
    user_id: 2,
  },
  {
    content: "Comment here",
    blogpost_id: 3,
    user_id: 3,
  },
  {
    content: "Comment here",
    blogpost_id: 4,
    user_id: 4,
  },
  {
    content: "Comment here",
    blogpost_id: 5,
    user_id: 5,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
