/*
 * All routes for Orders are defined here
 * Since this file is loaded in server.js into /orders, these routes are mounted onto /bubbleteas
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const queryString = `SELECT * FROM orders;`;
    db.query(queryString)
      .then(data => {
        const orders = data.rows;
        console.log(orders);
        res.json({ orders }); // This may need to be just sending back orders with no { }
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
