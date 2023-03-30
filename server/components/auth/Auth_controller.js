import express from "express";
import AuthService from "./Auth_service.js";
import { isAdmin, isUser } from "../../JWT_token.js";

const AuthController = express.Router();

AuthController.post("/login", AuthService.getAuth);
AuthController.get("/check", isUser);
AuthController.post("/register", isAdmin, AuthService.createAuth);
AuthController.delete("/:id", isAdmin, AuthService.deleteAccount);
AuthController.delete("/", isAdmin, AuthService.deleteBulkAccount);
AuthController.get("/", isAdmin, AuthService.getAccount);

export default AuthController;
