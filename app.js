const { sequelize } = require("./models");
const express = require("express");
const cors = require("cors");
const { authenticate } = require("./app/auth/authenticate");

const PORT = process.env.PORT || 3003;

const app = express();
app.use(cors());
app.use(express.json());
require("./startups")

app.use(authenticate)

app.use("/api", require("./routes"));

app.use((req, res, next) => {
    return res.send({ message: "Route not found" });
});

app.use((req, res, next, err) => {
    res.json({
        message: "", error: "unknown failure"
    })
});

app.listen(PORT, async () => {
    await main();
    console.log(`Service running on port ${PORT}`);
});

async function main() {
    await sequelize.authenticate();
}