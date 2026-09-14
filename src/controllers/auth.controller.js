const authService = require("../services/auth.service");

class AuthController {
    async register( req, res, next ) {
        try {
            const { email, password, username } = req.body;

            if (!username || !email || !password){
                return res.error("Vui lòng cung cấp đầy đủ các trường", "E-REQ", 400)
            }

            const newUser = await authService.register({ username, email, password })
            return res.success('Đăng ký tài khoản thành công', newUser, 201)
        } catch (error) {
            next(error);
        };
    };

    async login( req, res, next ) {
        try {
            const { email, password } = req.body;

            if ( !email || !password ){
                return res.error("Vui lòng nhập email và password", "E-REQ", 400)
            }

            const result = await authService.login(email, password)

            return res.success('Đăng nhập tài khoản thành công', result, 201)

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthController();