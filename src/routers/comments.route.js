const router = require("express").Router();
const commentsController = require("../controllers/comments.controller");

router.get("/post/:postId", commentsController.getByPost);
router.post("/post/:postId", commentsController.create);
router.delete("/:id", commentsController.remove);

module.exports = router;