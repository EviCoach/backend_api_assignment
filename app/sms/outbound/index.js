"use strict";
const router = require("express").Router();
const outBoundController = require("./OutboundController")

router.post('/sms', outBoundController.execute);

module.exports = router;