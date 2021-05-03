/*
 * All routes for Bubbleteas are defined here
 * Since this file is loaded in server.js into /bubbleteas, these routes are mounted onto /bubbleteas
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM bubbleteas;`)
      .then(data => {
        const bubbleteas = data.rows;
        res.json({ bubbleteas });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
