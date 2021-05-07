/*
 * All routes for Orders are defined here
 * Since this file is loaded in server.js into /orders, these routes are mounted onto /bubbleteas
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Get all orders for a customer user
  router.get("/", (req, res) => {
    // If not logged in, redirect to main page
    const user = req.user;
    if (!user) {
      res.redirect("/");
      return;
    }
    const userID = req.user.id;
    const queryString = `
      SELECT orders.*, sum(quantity * cost) as total_cost, sum(quantity) as total_items
      FROM orders
      JOIN users ON user_id = users.id
      JOIN order_line_items ON orders.id = order_id
      JOIN bubbleteas ON bubbletea_id = bubbleteas.id
      WHERE user_id = $1
      GROUP BY orders.id
      ORDER BY orders.id DESC;
    `;
    const values = [userID];

    db.query(queryString, values)
      .then((data) => {
        const orders = data.rows;
        const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ];
        const templateVars = {
          orders,
          user,
          months,
        };
        return res.render("orders", templateVars);
      })
      .catch((err) => {
        res.status(500).json({
          error: err.message,
        });
      });
  });

  // When a user creates a new order
  router.post("/", (req, res) => {
    const orders = req.body;
    const userID = req.user.id;
    const createdAt = new Date();

    // Only need user_id and created_at for order insert query
    const queryString = `
      INSERT INTO orders (user_id, created_at)
      VALUES ($1, $2) RETURNING *;
    `;
    const values = [userID, createdAt];

    db.query(queryString, values)
      .then((data) => data.rows[0]) // query returns a single order
      .then((order) => {
        const { id } = order;
        orders.forEach((order) => {
          // req.body contains an array
          const { bubbleteaId } = order;
          const queryString = `
            INSERT INTO order_line_items (bubbletea_id, order_id)
            VALUES ($1, $2) RETURNING *;
          `;
          const values = [bubbleteaId, id];
          db.query(queryString, values); // Can't do res.send or res.json here because in loop?
        });
        res.json(order); // if needs return data to front-end without network "red" error
      })
      .catch((err) => console.log(err.message));
  });

  // Update order status & eta request (from restaurant side)
  router.post("/:id", (req, res) => {
    const { orderID, eta, status } = req.body;
    const queryString = `
      UPDATE orders
      SET status = $1, eta = $2
      WHERE id = $3
      RETURNING *;
    `;
    const values = [status, eta, orderID];
    db.query(queryString, values)
      .then((data) => {
        res.json(data.rows[0]);
      })
      .catch((err) => console.log(err.message));
  });

  return router;
};
