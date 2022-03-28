const {validate} = require("../../auth/auth_validator");
const smsValidate = (req, res, next) => {
    const schema = {
        type: "object",
        properties: {
            to: { type: "string", minLength:6, maxLength: 16 },
            from: { type: "string", minLength:6, maxLength: 16 },
            text: { type: "string", minLength:1, maxLength: 120 }
        },
        required: ["to", "from", "text"],
        additionalProperties: true
    };

    const error = validate(schema, req.body);
    if (error) return res.json(error);
    return next();
}

exports.smsValidate = smsValidate;