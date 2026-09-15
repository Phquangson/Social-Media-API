const { body } = require("express-validator");

const registerValidator = [
    body("username")
        .trim()
        .notEmpty().withMessage("Username không được để trống")
        .isLength({ min: 3, max: 50 }).withMessage("Username phải từ 3 đến 50 ký tự"),

    body("email")
        .trim()
        .notEmpty().withMessage("Email không được để trống")
        .isEmail().withMessage("Email không đúng định dạng"),

    body("password")
        .notEmpty().withMessage("Password không được để trống")
        .isLength({ min: 6 }).withMessage("Password tối thiểu 6 ký tự"),
];

const loginValidator = [
    body("email")
        .trim()
        .notEmpty().withMessage("Email không được để trống")
        .isEmail().withMessage("Email không đúng định dạng"),

    body("password")
        .notEmpty().withMessage("Password không được để trống"),
];

module.exports = { registerValidator, loginValidator };