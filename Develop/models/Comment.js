// Import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// Import our database connection from config.js
const sequelize = require("../config/connection");

// Initialize Comment model (table) by extending off Sequelize's Model class
class Comment extends Model {}

// Use the init() method that extends the Model to set up fields and rules for the Comment model
Comment.init(
  // Define columns
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // Manually define the primary key
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Foreign Key reference
    // To tie the blogpost to the comment
    blogpost_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "blogpost",
        key: "id",
      },
    },
    // Foreign Key reference
    // To tie the user to the comment
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    // HOOKS HERE?

    // Link to database connection
    sequelize,
    // Set to false to remove `created_at` and `updated_at` fields
    timestamps: false,
    // Prevent sequelize from renaming the table
    freezeTableName: true,
    // Sets the field option on all attributes to the snake_case version of its name
    underscored: true,
    // Notice the name is lowercase, so we'll reference as lowercase later
    modelName: "comment",
  }
);

// Export Comment model
module.exports = Comment;
