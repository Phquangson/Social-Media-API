const { Comment, Post, User } = require("../models");
const { verifyAccessToken } = require("../utils/jwt.utils");

class CommentsService {

    #verifyToken(accessToken) {
        if (!accessToken) {
            const error = new Error("Access Token không đúng");
            error.statusCode = 401;
            error.errorCode = "E-TKE";
            throw error;
        }

        try {
            return verifyAccessToken(accessToken);
        } catch (err) {
            const error = new Error("Access Token không hợp lệ hoặc đã hết hạn");
            error.statusCode = 401;
            error.errorCode = "E-TKE";
            throw error;
        }
    }

    async getByPost(accessToken, postId) {
        this.#verifyToken(accessToken);

        const post = await Post.findByPk(postId);
        if (!post) {
            const error = new Error("Bài viết không tồn tại");
            error.statusCode = 404;
            error.errorCode = "E-NF";
            throw error;
        }

        const comments = await Comment.findAll({
            where: { postId },
            order: [["createdAt", "ASC"]],
            include: [{ model: User, as: "author", attributes: ["id", "username", "avatar"] }],
        });

        return comments;
    }

    async create(accessToken, postId, { content }) {
        const decoded = this.#verifyToken(accessToken);

        if (!content || !content.trim()) {
            const error = new Error("Nội dung bình luận không được để trống");
            error.statusCode = 400;
            error.errorCode = "E-VAL";
            throw error;
        }

        const post = await Post.findByPk(postId);
        if (!post) {
            const error = new Error("Bài viết không tồn tại");
            error.statusCode = 404;
            error.errorCode = "E-NF";
            throw error;
        }

        const comment = await Comment.create({
            postId,
            userId: decoded.sub,
            content,
        });

        return comment;
    }

    async remove(accessToken, id) {
        const decoded = this.#verifyToken(accessToken);

        const comment = await Comment.findByPk(id);

        if (!comment) {
            const error = new Error("Bình luận không tồn tại");
            error.statusCode = 404;
            error.errorCode = "E-NF";
            throw error;
        }

        if (comment.userId !== decoded.sub) {
            const error = new Error("Bạn không có quyền xóa bình luận này");
            error.statusCode = 403;
            error.errorCode = "E-FBD";
            throw error;
        }

        await comment.destroy();

        return { id };
    }
}

module.exports = new CommentsService();