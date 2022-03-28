const { Account } = require("../../models")
const authenticate = async (req, res, next) => {

    // parse login and password from headers
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const strauth = Buffer.from(b64auth, 'base64').toString();
    const splitIndex = strauth.indexOf(':');
    const username = strauth.substring(0, splitIndex);
    const auth_id = strauth.substring(splitIndex + 1);

    const account = await Account.findOne({ where: { username, auth_id } });

    console.log("Authenticated user ", JSON.stringify(account));

    if (!account) return res.status(403).json({
        message: "Account not found"
    });

    req.body.username = username;
    req.body.account_id = account.id;

    next();
};

exports.authenticate = authenticate;