import express from "express";
import userService from "./User_service.js";
import { isAdmin, isUser } from "../../JWT_token.js";

const UserController = express.Router();

UserController.get("/", isAdmin, userService.getAllUsers);
UserController.post("/", isAdmin, userService.createUser);
UserController.get("/:id", isUser, userService.getUser);
UserController.put("/:id", isAdmin, userService.updateUser);

UserController.delete("/users", isAdmin, userService.deleteBulkUser);
UserController.delete("/:id", isAdmin, userService.deleteUser);

export default UserController;
