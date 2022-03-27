const { sequelize } = require("./models");
const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3003;

const app = express();
app.use(cors());
app.use(express.json());

app.listen(PORT, async () => {
    await main();
    console.log(`Service running on port ${PORT}`);
});

async function main() {
    await sequelize.sync({force: true});
}