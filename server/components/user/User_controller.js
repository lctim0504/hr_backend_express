import express from "express";
import userService from "./User_service.js";

const UserContoller = express.Router();

UserContoller.get("/", userService.getAllUsers);
UserContoller.post("/", userService.createUser);
UserContoller.get("/:id", userService.getUser);
UserContoller.put("/:id", userService.updateUser);
UserContoller.delete("/:id", userService.deleteUser);

export default UserContoller;
