const postsService = require("../services/posts.service");

const getToken = (req) => {
    const header = req.headers.authorization;
    return header && header.startsWith("Bearer") ? header.split(" ")[1] : null;
};

class PostsController {

    async getAll(req, res, next) {
        try {
            const accessToken = getToken(req);
            const { page, limit } = req.query;
            const result = await postsService.getAll(accessToken, { page, limit });
            return res.success(result, "Lấy danh sách bài viết thành công");
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const accessToken = getToken(req);
            const { id } = req.params;
            const post = await postsService.getById(accessToken, id);
            return res.success(post, "Lấy chi tiết bài viết thành công");
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const accessToken = getToken(req);
            const { content, imageUrl } = req.body;
            const post = await postsService.create(accessToken, { content, imageUrl });
            return res.success(post, "Tạo bài viết thành công");
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const accessToken = getToken(req);
            const { id } = req.params;
            const { content, imageUrl } = req.body;
            const post = await postsService.update(accessToken, id, { content, imageUrl });
            return res.success(post, "Cập nhật bài viết thành công");
        } catch (error) {
            next(error);
        }
    }

    async remove(req, res, next) {
        try {
            const accessToken = getToken(req);
            const { id } = req.params;
            const result = await postsService.remove(accessToken, id);
            return res.success(result, "Xóa bài viết thành công");
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new PostsController();