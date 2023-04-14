import express from "express";
import overtimeService from "./Overtime_service.js";
import { isAdmin, isSupervisor, isUser } from "../../JWT_token.js";

const OvertimeController = express.Router();

OvertimeController.get("/filter", isSupervisor, overtimeService.getFilterOvertime); //主管取得部門請假資料
OvertimeController.put("/records", isAdmin, overtimeService.updateBulkOvertime);
OvertimeController.delete("/records", isUser, overtimeService.deleteBulkOvertime);

OvertimeController.get("/", isAdmin, overtimeService.getAllOvertimes);
OvertimeController.post("/", isUser, overtimeService.createOvertime);

OvertimeController.get("/:id", isUser, overtimeService.getOvertime);
OvertimeController.put("/:seq", isSupervisor, overtimeService.updateOvertime);
OvertimeController.delete("/:seq", isUser, overtimeService.deleteOvertime);

export default OvertimeController;
