const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/db.config");

const Post = sequelize.define(
    'Post',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "user_id"
        },
        content: {
            type: DataTypes.TEXT,
        },
        imageUrl: {
            type: DataTypes.STRING(255),
            field: "image_url"
        },
        createdAt: {
            type: DataTypes.DATE,
            field: "created_at"
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: "updated_at"
        },
    },
    {
        tableName: 'post',
        timestamps: true,
    },
);

module.exports = Post;