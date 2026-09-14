const express = require("express");
const router = require("./src/routers");
const responeMiddlware = require("./src/middlewares/respone.middlewares");
const { port } = require("./src/configs/env.config");
const sequelize = require("./src/configs/db.config");
const errorHandlerMiddleware = require("./src/middlewares/errorHandler.middleware");

const app = express();

PORT = 3000;

app.use(express.json());
app.use(responeMiddlware);

app.use("/api", router)


app.use(errorHandlerMiddleware);

const startServer = async() => {
    await sequelize.connectDB()

    app.listen(port, () => {
        console.log(`Server is running at port ${port}`)
    });
};

startServer();