// Import models
const User = require("./User");
const Blogpost = require("./Blogpost");
const Comment = require("./Comment");

// ASSOCIATIONS

// User hasMany blog posts
User.hasMany(Blogpost, {
  foreignKey: "user_id", // from Blogpost
  //onDelete: "CASCADE",
});

// Blog posts belongsTo user
Blogpost.belongsTo(User, {
  foreignKey: "user_id", // from Blogpost
});

// User hasMany comments
User.hasMany(Comment, {
  foreignKey: "user_id", // from Comment
  //onDelete: "CASCADE",
});

// Comment belongsTo user
Comment.belongsTo(User, {
  foreignKey: "user_id", // from Comment
});

// Blogpost hasMany comments
Blogpost.hasMany(Comment, {
  foreignKey: "blogpost_id", // from Comment
  //onDelete: "CASCADE",
});

// Comments belongsTo blogpost
Comment.belongsTo(Blogpost, {
  foreignKey: "user_id", // from Comment
});

module.exports = { User, Blogpost, Comment };
