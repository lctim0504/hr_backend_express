import express from "express";
import overtimeService from "./Overtime_service.js";
import { isAdmin, isSupervisor, isUser } from "../../JWT_token.js";

const OvertimeController = express.Router();

OvertimeController.get("/", isAdmin, overtimeService.getAllOvertimes);
OvertimeController.get("/filter", isSupervisor, overtimeService.getFilterOvertime); //主管取得部門請假資料

OvertimeController.post("/", isUser, overtimeService.createOvertime);
OvertimeController.get("/:id", isUser, overtimeService.getOvertime);
OvertimeController.put("/:id", isSupervisor, overtimeService.updateOvertime);
OvertimeController.put("/", isAdmin, overtimeService.updateBulkOvertime);
OvertimeController.delete("/:id", isUser, overtimeService.deleteOvertime);

export default OvertimeController;
