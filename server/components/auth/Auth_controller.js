import express from "express";
import AuthService from "./Auth_service.js";

const AuthController = express.Router();

AuthController.post("/login", AuthService.getAuth);
AuthController.post("/register", AuthService.createAuth);

export default AuthController;
