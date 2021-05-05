/*
 * All routes for sending SMS using Twilio are defined here
 */
const express = require("express");
const router = express.Router();

// Setup twilio account:
const ACCOUNT_SID = process.env.ACCOUNT_SID_S;
const AUTH_TOKEN = process.env.AUTH_TOKEN_S;
const TO_NUMBER = process.env.TO_NUMBER_S;
const MSG_SERVICE_SID = process.env.MSG_SERVICE_SID_S;

const setupTwilio = (msg) => {
  const accountSid = ACCOUNT_SID;
  const authToken = AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);
  return client.messages.create({
    body: msg,
    messagingServiceSid: MSG_SERVICE_SID,
    to: TO_NUMBER,
  });
};

module.exports = (db) => {
  // Send msg to customer
  router.get("/customer", (req, res) => {
    const msg = "Hi, your order is successfully submitted, Thank you";
    const twilioSMS = setupTwilio(msg);
    twilioSMS.then((message) => {
      res.send(`
      ${message.body}, ${message.dateCreated}, ${message.dateUpdated}, ${message.to}
      `);
    });
  });

  // Send msg to owner
  router.get("/owner", (req, res) => {
    const msg = "Hi owner, you have new order(s) coming...";
    const twilioSMS = setupTwilio(msg);
    twilioSMS.then((msg) => {
      res.send(`${msg.body}`);
    });
  });

  // Send customer message with status and eta:
  router.post("/:status", (req, res) => {
    const { orderID, eta, status } = req.body;
    const msg = `Dear customer, your order# ${orderID} has been ${status}, will be ready in ${eta} minutes, thank you for your order!`;
    const twilioSMS = setupTwilio(msg);
    twilioSMS
      .then((message) => {
        console.log(message);
      })
      .catch((err) => console.log(err.message));
  });

  return router;
};
