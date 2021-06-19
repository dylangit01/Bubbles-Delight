// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
// const sass = require("node-sass-middleware");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.use(
//   "/styles",
//   sass({
//     src: __dirname + "/styles",
//     dest: __dirname + "/public/styles",
//     debug: true,
//     outputStyle: "expanded",
//   })
// );
app.use(express.static("public"));

// Custom middleware to get the currently logged in user
const userParser = (req, res, next) => {
  const userID = req.session["user_id"];
  const queryString = `SELECT * FROM users WHERE id = $1;`;
  const values = [userID];

  // Get user object from database
  db.query(queryString, values)
    .then((data) => {
      const user = data.rows[0];
      req.user = user; // Add user object to req object and pass it to the next middleware
      next();
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};
app.use(userParser);

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const loginRoutes = require("./routes/login");
const logoutRoutes = require("./routes/logout");
const bubbleteasRoutes = require("./routes/bubbleteas");
const ordersRoutes = require("./routes/orders");
const restaurantsRoutes = require("./routes/restaurants");
const twilioRoutes = require("./routes/twilio");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: mount other resources here, using the same pattern above
app.use("/api/users", usersRoutes(db));
app.use("/login", loginRoutes(db));
app.use("/logout", logoutRoutes(db));
app.use("/bubbleteas", bubbleteasRoutes(db));
app.use("/orders", ordersRoutes(db));
app.use("/restaurants", restaurantsRoutes(db));
app.use("/sendSMS", twilioRoutes(db));

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.redirect("bubbleteas");
});

// App is listening
app.listen(PORT, () => {
  console.log(`Bubbles Delight app listening on port ${PORT}`);
});
