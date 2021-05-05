/*
 * All routes for sending SMS using Twilio are defined here
 */

// Setup twilio account:
const ACCOUNTSID = process.env.ACCOUNTSID;
const AUTHTOKEN = process.env.AUTHTOKEN;
const TO_NUMBER = process.env.TO_NUMBER;
const MSG_SERVICE_SID = process.env.MSG_SERVICE_SID;

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const accountSid = ACCOUNTSID;
    const authToken = AUTHTOKEN;
    const client = require("twilio")(accountSid, authToken);

    client.messages
      .create({
        body: "Hi there, tell me if you received it, Thank you",
        messagingServiceSid: MSG_SERVICE_SID,
        to: TO_NUMBER,
      })
      .then((message) => res.send(`${message.to}`))
      .done();
  });

  return router;
};
