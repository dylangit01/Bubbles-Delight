/*
 * All routes for Orders are defined here
 * Since this file is loaded in server.js into /orders, these routes are mounted onto /bubbleteas
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Get all orders for a certain user (whether a customer or admin)
  router.get("/", (req, res) => {
    // If not logged in, redirect to main page
    const user = req.user;
    if (!user) {
      return res.redirect("/");
    }

    const userID = req.user.id;
    const queryString = `
      SELECT orders.*, sum(quantity * cost) as total_cost, sum(quantity) as total_items
      FROM orders
      JOIN users ON user_id = users.id
      JOIN order_line_items ON orders.id = order_id
      JOIN bubbleteas ON bubbletea_id = bubbleteas.id
      WHERE user_id = $1
      GROUP BY orders.id;
    `;
    const values = [userID];

    db.query(queryString, values)
      .then((data) => {
        const orders = data.rows;
        // Sort orders from most recent to oldest
        orders.sort(function(a, b) {
          return b.id - a.id;
        });
        // console.log(orders);
        const templateVars = { orders, user };
        return res.render("orders", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Post order route:
  router.post("/", (req, res) => {
    const orders = req.body;
    const user_id = req.user.id;
    const created_at = new Date();

    // Only need user_id and created_at for order insert query
    const queryString = `
    INSERT INTO orders (user_id, created_at)
    VALUES ($1, $2) RETURNING *;
    `;
    const values = [user_id, created_at];

    return db
      .query(queryString, values)
      .then((res) => res.rows[0])   // query returns a single order
      .then(order => {
        const { id } = order;
        orders.forEach(order => {   // req.body contains an array
          const { bubbleteaId } = order;
          const queryString = `
          INSERT INTO order_line_items (bubbletea_id, order_id)
          VALUES ($1, $2) RETURNING *;
          `;
          const values = [bubbleteaId, id];
          db.query(queryString, values)
            .then((res) => {
              console.log(res.rows);
            })
        })

      })
      .catch((err) => console.log(err.message));
  });

  return router;
};
