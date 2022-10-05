// Import and require the npm package Sequelize
const Sequelize = require("sequelize");
// dotenv allows sensitive info like passwords to be kept safe
require("dotenv").config();

// Create a sequelize connection object with dotenv variables
// JAWSDB_URL is if the app is being deployed to Heroku, which it isn't in this case
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        // Database location (local = my computer)
        host: "localhost",
        dialect: "mysql",
        // port: 3306
        dialectOptions: {
          decimalNumbers: true,
        },
      }
    );

// Export sequelize connection to be used elsewhere
module.exports = sequelize;
