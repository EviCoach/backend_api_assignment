const { Sequelize, Account, Phone_number } = require("../../../models");
function days_between(date1, date2) {

    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(date1 - date2);

    // Convert back to days and return
    return Math.round(differenceMs / ONE_DAY);

}
exports.execute = async (req, res) => {

    const { to, from, text, account_id } = req.body;

    // do not allow more than 50 requests in 24hours
    const numberOfReq = await global.cache.get(from);
    if (!numberOfReq) {
        await global.cache.set(from, JSON.stringify({ count: "1", expiry: Date.now() }));
    } else {
        // if no. of requests is less than 50 and is within a day
        let count = JSON.parse(numberOfReq);
        if (+count.count >= 50 && days_between(Date.now(), +count.expiry) < 1) { 
            res.json({
                message: "",
                error: `limit reached for from ${from}`
            });
        }
        if (+count.count <= 50 && days_between(Date.now(), +count.expiry) > 1) { // reset 
            await global.cache.set(from, JSON.stringify({ count: "1", expiry: Date.now() }));
        }

        if (+count.count <= 50 && days_between(Date.now(), +count.expiry) < 1) { // update 
            count = +count.count;
            await global.cache.set(from, JSON.stringify({ count: count, expiry: +count.expiry }));
        }
    }

    const phoneNumber = await Phone_number.findOne({ where: { number: from } });
    console.log("From found: ", JSON.stringify(phoneNumber));

    if (!phoneNumber) return res.json({
        message: "",
        error: "from parameter not found"
    });

    // check cache if "to" entry is in cache
    const key = `${from}${to}`;
    console.log("key ==========", key);
    const data = await global.cache.get(key);
    if (data) {
        return res.json({
            message: "",
            error: `sms from ${from} to ${to} blocked by STOP request`
        })
    }

    res.json({
        message: "outbound sms ok",
        error: ""
    });
}