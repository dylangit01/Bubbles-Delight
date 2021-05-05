/*
 * All routes for sending SMS using Twilio are defined here
 */
const express = require("express");
const router = express.Router();

// Setup twilio account:
const ACCOUNTSID = process.env.ACCOUNTSID;
const AUTHTOKEN = process.env.AUTHTOKEN;
const TO_NUMBER = process.env.TO_NUMBER;
const MSG_SERVICE_SID = process.env.MSG_SERVICE_SID;

const setupTwilio = (msg) => {
  const accountSid = ACCOUNTSID;
  const authToken = AUTHTOKEN;
  const client = require("twilio")(accountSid, authToken);
  return client.messages.create({
    body: msg,
    messagingServiceSid: MSG_SERVICE_SID,
    to: TO_NUMBER,
  });
};

module.exports = (db) => {
  router.get("/", (req, res) => {
    const msg = "Hi, your order is successfully submitted, Thank you";
    const twilioSMS = setupTwilio(msg);
    twilioSMS.then((message) => {
      res.send(`
      ${message.body}, ${message.dateCreated}, ${message.dateUpdated}, ${message.to}
      `);
    });
  });

  return router;
};
