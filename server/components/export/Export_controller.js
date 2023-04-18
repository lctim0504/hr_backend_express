import express from "express";
import exportService from "./Export_service.js";
import { isAdmin, isUser } from "../../JWT_token.js";

const ExportController = express.Router();

ExportController.get("/leaveExcel", isAdmin, exportService.getLeaveRecords);
ExportController.get("/overtimeExcel", isAdmin, exportService.getOvertimeRecords);


export default ExportController;
