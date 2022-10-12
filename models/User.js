// Import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// Import the bcrypt npm package to hash the user's password
const bcrypt = require("bcrypt");
// Import our database connection from config.js
const sequelize = require("../config/connection");

// Create a new Sequelize model for User
class User extends Model {
  // Bcrypt: adds method to the sequelize User model to check the hashed password
  checkPassword(loginPassword) {
    return bcrypt.compareSync(loginPassword, this.password);
  }
}

/*
WHEN I choose to sign up
THEN I am prompted to create a username and password
WHEN I revisit the site at a later time and choose to sign in
THEN I am prompted to enter my username and password
*/

// Use the init() method that extends the Model to set up fields and rules for the User model
User.init(
  // Define columns
  // An `id` is automatically created by Sequelize, though best practice would be to define the primary key ourselves
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // Manually define the primary key
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // Password length must be a minimum of 9 characters
        len: [9],
      },
    },
  },
  {
    // Hooks allow the app to react when certain sequelize events occur
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    // Link to database connection
    sequelize,
    // Set to false to remove `created_at` and `updated_at` fields
    timestamps: false,
    // Prevent sequelize from renaming the table
    freezeTableName: true,
    // Sets the field option on all attributes to the snake_case version of its name
    underscored: true,
    // Notice the name is lowercase, so we'll reference as lowercase later
    modelName: "user",
  }
);

// Export User model
module.exports = User;
