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
    return res.redirect("/");
  });

  // Display log in form
  router.get("/", (req, res) => {
    const user = req.user;
    const templateVars = { user };
    return res.render("login", templateVars);
  });

  // FOR DEVELOPMENT PURPOSES: Handle user log in
  router.post("/", (req, res) => {
    // Get the user from database
    const { email } = req.body;
    const queryString = `SELECT * FROM users WHERE email = $1;`;
    const values = [email];
    db.query(queryString, values)
      .then((data) => {
        const user = data.rows[0];
        return res.redirect(`/login/${user.id}`);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
