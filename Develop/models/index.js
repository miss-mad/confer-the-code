// Import models
const User = require("./User");
const Blogpost = require("./Blogpost");
const Comment = require("./Comment");

// ASSOCIATIONS

// User hasMany blog posts
User.hasMany(Blogpost, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Blog posts belongsTo user
Blogpost.belongsTo(User, {
  foreignKey: "user_id",
});

// User hasMany comments
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Comment belongsTo user
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

// Blogpost hasMany comments
Blogpost.hasMany(Comment, {
  foreignKey: "blog_post_id",
  onDelete: "CASCADE",
});

// Comments belongsTo blogpost
Comment.belongsTo(Blogpost, {
  foreignKey: "user_id",
});

module.exports = { User, Blogpost, Comment };
