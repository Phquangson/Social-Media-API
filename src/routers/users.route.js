const router = require("express").Router();
const usersController = require("../controllers/users.controller");
const { updateMeValidator, getByIdValidator } = require("../validators/user.validator");
const validate = require("../middlewares/validate.middleware");

router.get("/me", usersController.getMe);
router.put("/me", updateMeValidator, validate, usersController.updateMe);
router.get("/:id", getByIdValidator, validate, usersController.getById);

module.exports = router;