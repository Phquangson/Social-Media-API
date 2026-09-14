const express = require("express");
const usersController = require("../controllers/users.controller");

const router = express.Router();

router.get("/me", usersController.getMe);
router.get("/:id", usersController.getById);
router.put("/me", usersController.updateMe);

module.exports = router;