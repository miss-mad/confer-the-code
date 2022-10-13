// Require the npm package express
const express = require("express");
// Require the routes to use them here
const routes = require("./controllers");
// Require the sequelize connection from the connection.js file
const sequelize = require("./config/connection");
// Require a nodejs core module called path to combine/translate different operating systems' path slashes
const path = require("path");
// Require the npm package express-session which saves the user login
const session = require("express-session");
// Require handlebars which is a template engine for the front end
const expressHandlebars = require("express-handlebars");
// Require helper js files
const helpers = require("./utils/helper");
// Require and use the npm package connect-session-sequelize
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Use/initialize express
const app = express();
// Heroku port variable + default local variable
const PORT = process.env.PORT || 3000;

// Set up Handlebars.js engine with custom js file helpers
const handlebars = expressHandlebars.create({ helpers });

const sess = {
  // This is the secret used to sign the session ID cookie; string for single secret; shouldn't be easily parsed
  secret: "secret here",
  // Session ID cookie with the following 3 options set
  cookie: {
    maxAge: 1000 * 60 * 10, // log out after 10 minutes in milliseconds
    // "httpOnly" is boolean. When truthy, the HttpOnly attribute is set, otherwise it is not. By default, the HttpOnly attribute is set.
    httpOnly: true,
    // "secure" is boolean. When truthy, the Secure attribute is set, otherwise it is not. By default, the Secure attribute is not set.
    secure: false,
    // Specifies the boolean or string to be the value for the SameSite Set-Cookie attribute. By default, this is false. 'strict' will set the SameSite attribute to Strict for strict same site enforcement.
    sameSite: "strict",
  },
  // Forces the session to be saved back to the session store, even if the session was never modified during the request. Usually want this set to false
  resave: false,
  saveUninitialized: true,
  // The session store instance
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Use the session middleware
app.use(session(sess));

// Inform express which template engine to use: handlebars
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

// Middleware for parsing application/json and urlencoded data
// Implement middleware for the parsing of JSON data in the request bodies
app.use(express.json());
// Implement middleware for parsing of URL encoded data
app.use(express.urlencoded({ extended: true }));

// Makes all of the files in the public folder a route instead of writing a custom route for each file (not efficient)
app.use(express.static(path.join(__dirname, "public")));

// Use the routes required from earlier
app.use(routes);

// Sync sequelize models to the database, then turn on the server
// The force: true object serves to drop tables if any exist, then recreates them

// define models' columns
// npm run start (runs server.js)
// change force: true to force: false below (in server.js)
// npm run seed (runs index.js in seeds folder)
// npm run start (runs server.js)
// now that force: is set to false, it will not drop the tables we just seeded with npm run seed
// no need to run npm run seed again unless data in the seeds file changes; there is a force: true in the seeds/index.js file as well to drop data and then recreate it
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
