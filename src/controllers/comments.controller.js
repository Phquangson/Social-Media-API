const commentsService = require("../services/comments.service");

const getToken = (req) => {
    const header = req.headers.authorization;
    return header && header.startsWith("Bearer") ? header.split(" ")[1] : null;
};

class CommentsController {

    async getByPost(req, res, next) {
        try {
            const accessToken = getToken(req);
            const { postId } = req.params;
            const comments = await commentsService.getByPost(accessToken, postId);
            return res.success(comments, "Lấy danh sách bình luận thành công");
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const accessToken = getToken(req);
            const { postId } = req.params;
            const { content } = req.body;
            const comment = await commentsService.create(accessToken, postId, { content });
            return res.success(comment, "Thêm bình luận thành công");
        } catch (error) {
            next(error);
        }
    }

    async remove(req, res, next) {
        try {
            const accessToken = getToken(req);
            const { id } = req.params;
            const result = await commentsService.remove(accessToken, id);
            return res.success(result, "Xóa bình luận thành công");
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CommentsController();