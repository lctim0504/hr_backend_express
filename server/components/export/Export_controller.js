import express from "express";
import exportService from "./Export_service.js";
import { isAdmin, isUser } from "../../JWT_token.js";

const ExportController = express.Router();

ExportController.get("/leaveRecords", exportService.getLeaveRecords);


export default ExportController;
