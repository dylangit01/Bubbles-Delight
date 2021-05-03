/*
 * All routes for Orders are defined here
 * Since this file is loaded in server.js into /orders, these routes are mounted onto /bubbleteas
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // Get all orders for a certain user (whether a customer or admin)
  router.get("/", (req, res) => {
    // const userID = req.session['user_id'];
    const queryString = `SELECT * FROM orders WHERE id = $1;`;
    const values = [1]; //Update to cookie session id

    db.query(queryString, values)
      .then(data => {
        const orders = data.rows;
        res.json(orders);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
