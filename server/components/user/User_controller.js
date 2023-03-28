import express from "express";
import userService from "./User_service.js";
import { isAdmin, isUser } from "../../JWT_token.js";

const UserController = express.Router();

UserController.get("/", userService.getAllUsers);
UserController.post("/", userService.createUser);
UserController.get("/:id", userService.getUser);
UserController.put("/:id", userService.updateUser);
UserController.delete("/:id", userService.deleteUser);

export default UserController;
