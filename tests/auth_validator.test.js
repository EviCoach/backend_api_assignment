const {
    validateAuth
} = require('../app/auth/auth_validator');
test('Basic authentication is required', () => {
    expect(validateAuth({})).toStrictEqual([
        { "error": "username is missing" },
        { "error": "auth_id is missing" }
    ]);
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
    })).toStrictEqual([
        { "error": "username is invalid" },
        { "error": "auth_id is invalid" }
    ]);
});