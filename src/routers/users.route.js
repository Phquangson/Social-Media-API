const express = require("express");
const usersController = require("../controllers/users.controller");

const routerUsers = express.Router();

routerUsers.get("/me", usersController.getMe);
routerUsers.get("/:id", usersController.getById);
routerUsers.put("/me", usersController.updateMe);

module.exports = routerUsers;