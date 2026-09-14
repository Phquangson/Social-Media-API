const User = require("../models/user.model");
const { hashPassword, comparePassword } = require("../utils/hash.utils");
const { generateAccessToken, verifyAccessToken } = require("../utils/jwt.utils");

class AuthService {
    async register( {username ,email, password} ) {
        const existingUser = await User.findOne({
            where: { email }
        })

        if ( existingUser ) {
            const error = new Error("Email đã được sử dụng")
            error.errorCode = "E-RES"
            error.statusCode = 409
            throw error
        }

        const hashedPassword = await hashPassword(password)

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        })

        const returnedUser = {
            id: newUser.id,
            email: newUser.email,
            username: newUser.username,
        };

        return returnedUser
    };

    async login ( email, password ) {
        const user = await User.findOne({ where: {email} })

        if(!user) {
            const error = new Error("Email hoặc mật khẩu không đúng")
            error.statusCode = 401
            throw error
        }

        const isMatch = await comparePassword ( password, user.password )

        if(!isMatch) {
            const error = new Error("Email hoặc mật khẩu không đúng");
            error.statusCode = 401;
            throw error;
        }

        const payload = { sub: user.id, email: user.email, username: user.username, avatar: user.avatar || "Avatar mặc định" }

        const accessToken = generateAccessToken(payload)

        return accessToken;

    }
}

module.exports = new AuthService();