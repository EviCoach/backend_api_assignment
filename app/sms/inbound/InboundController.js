const { Sequelize, Account, Phone_number } = require("../../../models");
exports.execute = async (req, res) => {
    const { to, from, text, account_id } = req.body;

    if (text && text.toUpperCase() === "STOP"
        || text.toUpperCase() === "STOP\n"
        || text.toUpperCase() === "STOP\r\n") {
        const key = `${to}${from}`;
        console.log("key ==========", key);
        await global.cache.set(key, JSON.stringify({ to, from }), {
            EX: 60 * 60 * 4
        });
    }

    const phoneNumber = await Phone_number.findOne({ where: { number: to, account_id } });
    if (!phoneNumber) return res.json({
        message: "", error: "to parameter not found"
    });

    console.log("Phone numbers", JSON.stringify(phoneNumber));

    res.json({
        message: "inbound sms ok", "error": ""
    });
}