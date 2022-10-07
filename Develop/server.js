const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");

const path = require("path");
const session = require("express-session");
const expressHandlebars = require("express-handlebars");
// const helpers = require("./utils") if there is a helper.js file
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars.js engine with custom helpers
// const handlebars = expressHandlebars.create({ helpers });

// look up what all this means once I get to sessions section
// const sess = {
//   secret: "secret here",
//   cookie: {
//     //maxAge: , // log out after this amount of time in milliseconds
//     httpOnly: true,
//     secure: false,
//     sameSite: "strict",
//   },
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize,
//   }),
// };

// app.use(session(sess));

// Inform express which template engine to use: handlebars
// app.engine("handlebars", hbs.engine);
// app.set("view engine", "handlebars");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Makes all of the files in the public folder a route instead of writing a custom route for each file
app.use(express.static(path.join(__dirname, "public")));

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
