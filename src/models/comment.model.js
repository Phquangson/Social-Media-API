const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/db.config");

const Comment = sequelize.define(
    'Comment',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "post_id"
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "user_id"
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
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
        tableName: 'comment',
        timestamps: true,
    },
);

module.exports = Comment;