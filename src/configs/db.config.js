const { Sequelize, Model } = require ("sequelize");
const { db, nodeEnv } = require("./env.config");

const sequelize = new Sequelize( db.name, db.user, db.password, {
    host: db.host,
    port: db.port,
    dialect: "mysql",
    logging: nodeEnv === 'development' ? console.log : false,
    define: {
        timestamps: true
    }
});

const connectDB = async () => {
    try{
        await sequelize.authenticate()

        console.log("Kết nối Db thành công");

        await sequelize.sync({
            alter: nodeEnv === 'development'
        })

        console.log("Đồng bộ model thành công")
    } catch ( error ) {
        throw error("Kết nối db thất bại")
    }
}

module.exports = { sequelize, connectDB };