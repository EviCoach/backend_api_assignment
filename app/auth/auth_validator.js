const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

const validate = (schema, data) => {
    const validate = ajv.compile(schema);
    const valid = validate(data);
    console.log(validate.errors);
    
    if (valid) return null;
    const errors = validate.errors.map(error => {
        let key = "";
        const errorKey = error.instancePath.indexOf("/");
        if (errorKey >= 0) {
            key = error.instancePath.substr(errorKey + 1);
        }
        let value = {};
        if (error.keyword === 'type') {
            value.error = `${key} is invalid`
        }
        if (error.keyword === 'required') {
            value.error = `${error.params.missingProperty} is missing`;
        }
        console.log(JSON.stringify("Params", error.params))
        return value;
    });
    return errors;
}

const auth_validator = (req, res, next) => {
    const error = validateAuth(req.body);
    if (error) return res.json(errors);
    return next();
}

const validateAuth = (data) => {
    const schema = {
        type: "object",
        properties: {
            username: { type: "string" },
            auth_id: { type: "string" }
        },
        required: ["username", "auth_id"],
        additionalProperties: false
    };
    return validate(schema, data);
}

exports.validate = validate;
exports.validateAuth = validateAuth;
exports.auth_validator = auth_validator;