const bcrypt = require("bcryptjs")
const { bcryptSaltRounds } = require("../configs/env.config")

const hashPassword = async (rawPassword) => {
    const salt = await bcrypt.genSalt(bcryptSaltRounds);
    return bcrypt.hash(rawPassword, salt)
};

const comparePassword = async ( rawPassword, hashedPassword ) => {
    return bcrypt.compare(rawPassword, hashedPassword)
}

module.exports = { hashPassword, comparePassword };