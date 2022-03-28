"use strict";
const router = require("express").Router();
const inBoundController = require("./InboundController")

router.post('/sms', inBoundController.execute);

module.exports = router;

