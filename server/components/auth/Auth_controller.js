import express from "express";
import AuthService from "./Auth_service.js";
import { isAdmin, isUser } from "../../JWT_token.js";

const AuthController = express.Router();

// AuthController.get("/check", isUser, AuthService.returnIsUser);
AuthController.post("/login", AuthService.getAuth);
AuthController.post("/register", isAdmin, AuthService.createAuth);

AuthController.get("/", isAdmin, AuthService.getAllAccount);
AuthController.delete("/:id", isAdmin, AuthService.deleteAccount);
AuthController.put("/", isAdmin, AuthService.deleteBulkAccount);

export default AuthController;
