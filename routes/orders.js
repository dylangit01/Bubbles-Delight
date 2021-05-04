/*
 * All routes for Orders are defined here
 * Since this file is loaded in server.js into /orders, these routes are mounted onto /bubbleteas
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // Get all orders for a certain user (whether a customer or admin)
  router.get("/", (req, res) => {
    // If not logged in, redirect to main page
    const user = req.user;
    if (!user) {
      return res.redirect('/');
    }

    const userID = req.user.id;
    const queryString = `
      SELECT orders.*, quantity * cost as total_cost, quantity
      FROM orders
      JOIN users ON user_id = users.id
      JOIN order_line_items ON orders.id = order_id
      JOIN bubbleteas ON bubbletea_id = bubbleteas.id
      WHERE user_id = $1;
    `;
    const values = [userID];

    db.query(queryString, values)
      .then(data => {
        const orders = data.rows;
        console.log(orders);
        const templateVars = { orders, user };
        return res.render('orders', templateVars);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });




  return router;
};


