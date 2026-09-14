const User = require("../models/user.model");
const { generateAccessToken, verifyAccessToken } = require("../utils/jwt.utils");

class UsersService {
    async getMe(accessToken) {
        if (!accessToken) {
            const error = new Error("Access Token không đúng");
            error.statusCode = 401;
            error.errorCode = "E-TKE";
            throw error;
        }

        let decoded;
        try {
            decoded = verifyAccessToken(accessToken);
        } catch (err) {
            const error = new Error('Access Token không hợp lệ hoặc đã hết hạn');
            error.statusCode = 401;
            error.errorCode = "E-TKE";
            throw error;
        }

        const user = await User.findByPk(decoded.sub);

        if (!user) {
            const error = new Error("Người dùng không tồn tại");
            error.statusCode = 401;
            error.errorCode = "E-TKE";
            throw error;
        }

        return {
            email: user.email,
            username: user.username,
            avatar: user.avatar,
        };
    }

    async getById(accessToken, id) {
        if (!accessToken) {
            const error = new Error("Access Token không đúng");
            error.statusCode = 401;
            error.errorCode = "E-TKE";
            throw error;
        }

        try {
            verifyAccessToken(accessToken);
        } catch (err) {
            const error = new Error('Access Token không hợp lệ hoặc đã hết hạn');
            error.statusCode = 401;
            error.errorCode = "E-TKE";
            throw error;
        }

        const user = await User.findByPk(id);

        if (!user) {
            const error = new Error("Người dùng không tồn tại");
            error.errorCode = "E-NF";
            error.statusCode = 404;
            throw error;
        }

        return {
            username: user.username,
            email: user.email,
            avatar: user.avatar,
        };
    }

    async updateMe(accessToken, { username, avatar } = {}) {
        if (!accessToken) {
            const error = new Error("Access Token không đúng");
            error.statusCode = 401;
            error.errorCode = "E-TKE";
            throw error;
        }

        let decoded;
        try {
            decoded = verifyAccessToken(accessToken);
        } catch (err) {
            const error = new Error('Access Token không hợp lệ hoặc đã hết hạn');
            error.statusCode = 401;
            error.errorCode = "E-TKE";
            throw error;
        }

        const user = await User.findByPk(decoded.sub);

        if (!user) {
            const error = new Error("Người dùng không tồn tại");
            error.statusCode = 401;
            error.errorCode = "E-TKE";
            throw error;
        }

        if (username !== undefined) user.username = username;
        if (avatar !== undefined) user.avatar = avatar;

        await user.save();

        return {
            email: user.email,
            username: user.username,
            avatar: user.avatar,
        };
    }
}

module.exports = new UsersService();