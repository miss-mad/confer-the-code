// Import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// Import our database connection from config.js
const sequelize = require("../config/connection");

// Create a new Sequelize model for Blogpost
class Blogpost extends Model {}

// Use the init() method that extends the Model to set up fields and rules for the Blogpost model
Blogpost.init(
  // Define columns
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // Manually define the primary key
      primaryKey: true,
      autoIncrement: true,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    blogpost_name: {
      // Default string character limit is 255
      type: DataTypes.STRING,
      allowNull: false,
    },
    blogpost_description: {
      // DataTypes is TEXT so that there is no limit
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Foreign Key reference
    // To tie the user to the blog post
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    // Link to database connection
    sequelize,
    // Set to true to automatically create `created_at` and `updated_at` fields for blogpost timestamps
    timestamps: true,
    // Prevent sequelize from renaming the table
    freezeTableName: true,
    // Sets the field option on all attributes to the snake_case version of its name
    underscored: true,
    // Notice the name is lowercase, so we'll reference as lowercase later
    modelName: "blogpost",
  }
);

// Export Blogpost model
module.exports = Blogpost;
