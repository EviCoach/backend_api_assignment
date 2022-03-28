const { createClient } = require('redis');

(async () => {
    const client = createClient();

    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();
    global.cache = client;
    // await client.set('key', 'value');
    // const value = await client.get('key');
})();