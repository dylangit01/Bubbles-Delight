/*
 * All routes for Restaurants are defined here
 * Since this file is loaded in server.js into /restaurants these routes are mounted onto /restaurants
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Get all orders for a restaurant
  router.get("/:id/orders", (req, res) => {
    // If not logged in, redirect to main page
    const user = req.user;
    if (!user) {
      res.redirect("/");
      return;
    }

    // If not an admin, redirect to main page
    if (!user.is_admin) {
      res.redirect("/");
      return;
    }

    // Query for all the orders (because we only have one restaurant)
    const userID = req.user.id;
    const queryString = `
      SELECT orders.*, sum(quantity * cost) as total_cost, sum(quantity) as total_items
      FROM orders
      JOIN users ON user_id = users.id
      JOIN order_line_items ON orders.id = order_id
      JOIN bubbleteas ON bubbletea_id = bubbleteas.id
      GROUP BY orders.id
      ORDER BY orders.id DESC;
    `;

  //   db.query(queryString)
  //     .then((data) => {
  //       const orders = data.rows;
  //       // Sort orders from most recent to oldest
  //       orders.sort(function(a, b) {
  //         return b.id - a.id;
  //       });
  //       // console.log(orders);
  //       const templateVars = { orders, user };
  //       return res.render("orders", templateVars);
  //     })
  //     .catch((err) => {
  //       res.status(500).json({ error: err.message });
  //     });
  });

  return router;
};
