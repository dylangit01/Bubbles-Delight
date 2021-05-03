/*
 * All routes for Orders are defined here
 * Since this file is loaded in server.js into /orders, these routes are mounted onto /bubbleteas
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // Get all orders for a certain user (whether a customer or admin)
  router.get("/", (req, res) => {
    // const userID = req.session['user_id'];
    const queryString = `SELECT orders.id as Order_ID, count(orders.id) * cost as total_price, count(quantity) quantity, orders.*
                        FROM orders
                        JOIN users ON user_id = users.id
                        JOIN order_line_items ON orders.id = order_id
                        JOIN bubbleteas ON bubbletea_id = bubbleteas.id
                        WHERE user_id = $1
                        GROUP BY orders.id,cost
                        ;`;
    const values = [1]; //Update to cookie session id

    db.query(queryString, values)
      .then(data => {
        const orders = data.rows;
        const userID = req.session['user_id'];
        const templateVars = { orders, userID };
        return res.render('orders', templateVars);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};


