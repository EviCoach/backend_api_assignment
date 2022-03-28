"use strict";
const router = require("express").Router();
const inBoundSMS = require("../app/sms/inbound")
const outBoundSMS = require("../app/sms/outbound")

router.use('/inbound', inBoundSMS);
router.use('/outbound', outBoundSMS);

module.exports = router;

