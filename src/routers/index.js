const express = require("express");
const authRouter = require("./auth.route");
const usersRouter = require("./users.route");
const postRouter = require("./posts.route");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/post", postRouter);

module.exports = router;