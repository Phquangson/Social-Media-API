const { body, param } = require("express-validator");

const updateMeValidator = [
    body("username")
        .optional()
        .trim()
        .notEmpty().withMessage("Username không được để trống")
        .isLength({ min: 3, max: 50 }).withMessage("Username phải từ 3 đến 50 ký tự"),

    body("avatar")
        .optional({ nullable: true })
        .isURL().withMessage("Avatar phải là một URL hợp lệ"),
];

const getByIdValidator = [
    param("id")
        .isInt({ min: 1 }).withMessage("ID người dùng không hợp lệ"),
];

module.exports = { updateMeValidator, getByIdValidator };