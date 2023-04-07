import express from "express";
import AuthService from "./Auth_service.js";
import { isAdmin, isUser } from "../../JWT_token.js";

const AuthController = express.Router();

AuthController.get("/check", isUser);
AuthController.post("/login", AuthService.getAuth);
AuthController.post("/register", isAdmin, AuthService.createAuth);

AuthController.get("/", isAdmin, AuthService.getAllAccount);
AuthController.delete("/:id", isAdmin, AuthService.deleteAccount);
AuthController.delete("/", isAdmin, AuthService.deleteBulkAccount);

export default AuthController;
