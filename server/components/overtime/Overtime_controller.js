import express from "express";
import overtimeService from "./Overtime_service.js";
import { isAdmin, isSupervisor, isUser } from "../../JWT_token.js";

const OvertimeController = express.Router();

OvertimeController.get("/", isAdmin, overtimeService.getAllOvertimes);

OvertimeController.post("/", isUser, overtimeService.createOvertime);
OvertimeController.get("/:id", isUser, overtimeService.getOvertime);
OvertimeController.put("/", isAdmin, overtimeService.updateBulkOvertime);
OvertimeController.put("/:seq", isSupervisor, overtimeService.updateOvertime);
OvertimeController.delete("/:seq", isUser, overtimeService.deleteOvertime);

export default OvertimeController;
