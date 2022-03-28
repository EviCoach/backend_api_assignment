"use strict";
const router = require("express").Router();
const inBoundController = require("./InboundController");
const {smsValidate} = require("./validator")

router.post('/sms',smsValidate, inBoundController.execute);

module.exports = router;

