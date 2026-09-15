const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/db.config");

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(255),
            allowNull: false, 
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true 
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        avatar: {
            type: DataTypes.STRING(255),
        },
        createdAt: {
            type: DataTypes.TIME,
            field: "created_at"
        },
        updatedAt: {
            type: DataTypes.TIME,
            field: "updated_at"
        },
        deletedAt: {
            type: DataTypes.TIME,
            field: "deleted_at"
        },
        
    },
    {
        tableName: 'user',
        timestamps: true,
    },
);

module.exports = User;