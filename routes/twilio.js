/*
 * All routes for sending SMS using Twilio are defined here
 */
const express = require("express");
const router = express.Router();

// Setup twilio account:
const ACCOUNT_SID = process.env.ACCOUNT_SID_D;
const AUTH_TOKEN = process.env.AUTH_TOKEN_D;
const TO_NUMBER = process.env.TO_NUMBER_D;
const MSG_SERVICE_SID = process.env.MSG_SERVICE_SID_D;

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
    })
  })




  return router;
};
