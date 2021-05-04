/*
 * All routes for Login are defined here
 * Since this file is loaded in server.js into /login, these routes are mounted onto /login
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // FOR DEVELOPMENT PURPOSES: handle user login and set a cookie with the user id
  router.get("/:id", (req, res) => {
    req.session["user_id"] = req.params.id;
    res.redirect("/");
  });

  // Display log in form
  router.get("/", (req, res) => {
    const userID = req.session["user_id"];
    const templateVars = { userID };
    res.render("login", templateVars);
  });

  // FOR DEVELOPMENT PURPOSES: Handle user log in
  router.post("/", (req, res) => {
    // const { email, password } = req.body;
    // Are we supposed to query databse for user?
    res.redirect("/login/1"); // Redirection for user 1
  });

  return router;
};
