const { smsValidate } = require("../app/sms/inbound/validator");

test('Basic authentication is required', () => {
    expect(smsValidate({})).toStrictEqual([
        { "message": "must have required property 'to'" },
        { "message": "must have required property 'from'"},
        { "message": "must have required property 'text'" }
    ]);
});
