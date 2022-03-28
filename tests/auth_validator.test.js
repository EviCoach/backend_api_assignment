const {
    validateAuth
} = require('../app/auth/auth_validator');
test('Basic authentication is required', () => {
    expect(validateAuth({})).toStrictEqual([{ "message": "must have required property 'username'" }, { "message": "must have required property 'auth_id'" }]);
});

test('Basic authentication is required', () => {
    expect(validateAuth({
        username: "evi",
        auth_id: "name"
    })).toBe(null);
});

test('Basic authentication is required', () => {
    expect(validateAuth({
        username: 1,
        auth_id: 2
    })).toStrictEqual([{ "key": "username", "message": "username must be string" }, { "key": "auth_id", "message": "auth_id must be string" }]);
});