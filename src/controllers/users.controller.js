const usersService = require("../services/users.service");

const getToken = (req) => {
    const header = req.headers.authorization;
    return header && header.startsWith("Bearer") ? header.split(" ")[1] : null;
};

class UsersController {

    async getMe(req, res, next) {
        try {
            const accessToken = getToken(req);
            const profile = await usersService.getMe(accessToken);
            return res.success(profile, 'Lấy thông tin thành công');
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const accessToken = getToken(req);
            const { id } = req.params;
            const info = await usersService.getById(accessToken, id);
            return res.success(info, 'Lấy thông tin thành công');
        } catch (error) {
            next(error);
        }
    }

    async updateMe(req, res, next) {
        try {
            const accessToken = getToken(req);
            const { username, avatar } = req.body;
            const profile = await usersService.updateMe(accessToken, { username, avatar });
            return res.success(profile, 'Cập nhật thông tin thành công');
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UsersController();