/*
 * All routes for Logout are defined here
 * Since this file is loaded in server.js into /logout, these routes are mounted onto /logout
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // Handle user logout and clear cookies
  router.post("/", (req, res) => {
    req.session = null;
    res.redirect('/');
  });

  return router;
};
