// // jest.mock('../__mocks__/http');
// jest.mock('../__mocks__/axios');
// const puppeteer = require('puppeteer');
function add(num1, num2) {
    return num1 + num2;
}

test('Should output sum of two numbers', () => {
    const sum = add(1, 2);
    expect(sum).toBe(3);
});

// test('String inputs should concatenate', () => {
//     const val = add("5", "6");
//     expect(val).toBe("56");
// })

// test('Should click around', async () => {
//     const browser = await puppeteer.launch({
//         headless: false,
//         slowMo: 80,
//         args: ['--window-size=1920,1080']
//     });
//     const page = browser.newPage();
//     await page.goto('file:///Users/evi/masterclass/typescript/understanding-ts/index.html');
//     await page.click('input#name')

// })