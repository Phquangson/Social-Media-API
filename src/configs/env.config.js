require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',

    db: {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 3306,
        name: process.env.DB_NAME,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || ""
    },

    jwt: {
        accessSecret: process.env.JWWT_ACCESS_SECRET,
        refreshSecret: process.env.JWWT_REFRESH_SECRET,
        accessExpiresIn: process.env.JWWT_ACCESS_EXPIRES || "15m",
        refreshExpiresIn: process.env.JWWT_REFRESH_EXPIRES || "7d",

    },

    bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUND) || 10
}