"use strict";
const router = require("express").Router();
const { smsValidate } = require("../inbound/validator");
const outBoundController = require("./OutboundController")

router.post('/sms', smsValidate, outBoundController.execute);

module.exports = router;