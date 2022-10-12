// Import and require the npm package Sequelize
const Sequelize = require("sequelize");
// dotenv allows sensitive info like passwords to be kept safe
require("dotenv").config();

// Create a sequelize connection object with dotenv variables
// JAWSDB_URL is an add on in heroku that allows the app to connect to a remote database (jawsdb being this database), still using local database blogpost_db when running on local computer
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
    // dotenv environment variables stored in gitignored .env file
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
