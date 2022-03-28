const { smsValidate } = require("../app/sms/inbound/validator");

test('Basic authentication is required', () => {
    expect(smsValidate({})).toStrictEqual([
        { "error": "to is missing" },
        { "error": "from is missing"},
        { "error": "text is missing" }
    ]);
});
