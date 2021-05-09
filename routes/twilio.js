/*
 * All routes for sending SMS using Twilio are defined here
 */
const express = require("express");
const router = express.Router();

// Setup twilio account:
const accountSid = process.env.ACCOUNT_SID_S;
const authToken = process.env.AUTH_TOKEN_S;
const TO_NUMBER = process.env.TO_NUMBER_S;
const MSG_SERVICE_SID = process.env.MSG_SERVICE_SID_S;

const client = require("twilio")(accountSid, authToken);

const sendTwilioMsg = (msg) => {
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
    const twilioSMS = sendTwilioMsg(msg);
    twilioSMS.then((message) => {
      res.send(`
      ${message.body}, ${message.dateCreated}, ${message.dateUpdated}, ${message.to}
      `);
    });
  });

  // Send msg to owner
  router.get("/owner", (req, res) => {
    const msg = "Hi owner, you have new order(s) coming...";
    const twilioSMS = sendTwilioMsg(msg);
    twilioSMS.then((msg) => {
      res.send(`${msg.body}`);
    });
  });

  // Send customer message with status and eta:
  router.post("/inprogress", (req, res) => {
    const { orderID, eta, status } = req.body;
    const msg = `Dear customer, your order# ${orderID} is ${status} , will be ready in ${eta} minutes, thank you for your order!`;
    const twilioSMS = sendTwilioMsg(msg);
    twilioSMS
      .then((message) => {
        return res.send(`
        Message has been sent to customer:${message.to} on ${message.dateCreated}.
        `);
      })
      .catch((err) => console.log(err));
  });

  router.post("/completed", (req, res) => {
    const { orderID, status } = req.body;
    const msg = `Dear customer, your order# ${orderID} is ${status} and ready for pick up, thank you for your business!`;
    const twilioSMS = sendTwilioMsg(msg);
    twilioSMS
      .then((message) => {
        return res.send(`
        Message has been sent to customer:${message.to} on ${message.dateCreated}.
        `);
      })
      .catch((err) => console.log(err));
  });

  return router;
};
