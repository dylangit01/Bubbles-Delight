/*
 * All routes for Bubbleteas are defined here
 * Since this file is loaded in server.js into /bubbleteas, these routes are mounted onto /bubbleteas
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const queryString = `SELECT * FROM bubbleteas;`;
    db.query(queryString)
      .then(data => {
        const bubbleteas = data.rows;
        res.json({ bubbleteas }); // This may need to be just sending back bubbleteas with no { }
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
