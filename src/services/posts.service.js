const Post = require("../models/post.model");
const User = require("../models/user.model");
const { verifyAccessToken } = require("../utils/jwt.utils");

class PostsService {

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

    async getAll(accessToken, { page = 1, limit = 10 } = {}) {
        this.#verifyToken(accessToken);

        const pageNum = Math.max(parseInt(page) || 1, 1);
        const limitNum = Math.max(parseInt(limit) || 10, 1);
        const offset = (pageNum - 1) * limitNum;

        const { rows, count } = await Post.findAndCountAll({
            limit: limitNum,
            offset,
            order: [["createdAt", "DESC"]],
            include: [{ model: User, as: "author", attributes: ["id", "username", "avatar"] }],
        });

        return {
            posts: rows,
            pagination: {
                page: pageNum,
                limit: limitNum,
                total: count,
                totalPages: Math.ceil(count / limitNum),
            },
        };
    }

    async getById(accessToken, id) {
        this.#verifyToken(accessToken);

        const post = await Post.findByPk(id, {
            include: [{ model: User, as: "author", attributes: ["id", "username", "avatar"] }],
        });

        if (!post) {
            const error = new Error("Bài viết không tồn tại");
            error.statusCode = 404;
            error.errorCode = "E-NF";
            throw error;
        }

        return post;
    }

    async create(accessToken, { content, imageUrl }) {
        const decoded = this.#verifyToken(accessToken);

        if (!content) {
            const error = new Error("Nội dung bài viết không được để trống");
            error.statusCode = 400;
            error.errorCode = "E-VAL";
            throw error;
        }

        const post = await Post.create({
            content,
            imageUrl: imageUrl || null,
            userId: decoded.sub,
        });

        return post;
    }

    async update(accessToken, id, { content, imageUrl }) {
        const decoded = this.#verifyToken(accessToken);

        const post = await Post.findByPk(id);

        if (!post) {
            const error = new Error("Bài viết không tồn tại");
            error.statusCode = 404;
            error.errorCode = "E-NF";
            throw error;
        }

        if (post.userId !== decoded.sub) {
            const error = new Error("Bạn không có quyền chỉnh sửa bài viết này");
            error.statusCode = 403;
            error.errorCode = "E-FBD";
            throw error;
        }

        if (content !== undefined) post.content = content;
        if (imageUrl !== undefined) post.imageUrl = imageUrl;

        await post.save();

        return post;
    }

    async remove(accessToken, id) {
        const decoded = this.#verifyToken(accessToken);

        const post = await Post.findByPk(id);

        if (!post) {
            const error = new Error("Bài viết không tồn tại");
            error.statusCode = 404;
            error.errorCode = "E-NF";
            throw error;
        }

        if (post.userId !== decoded.sub) {
            const error = new Error("Bạn không có quyền xóa bài viết này");
            error.statusCode = 403;
            error.errorCode = "E-FBD";
            throw error;
        }

        await post.destroy();

        return { id };
    }
}

module.exports = new PostsService();