import express from "express";
import leaveService from "./Leave_service.js";
import { isAdmin, isSupervisor, isUser } from "../../JWT_token.js";

const LeaveController = express.Router();

LeaveController.get("/", isAdmin, leaveService.getAllLeaves);

LeaveController.get("/filter", isSupervisor, leaveService.getFilterLeave); //主管取得部門請假資料
LeaveController.delete("/records", isUser, leaveService.deleteBulkLeave);
LeaveController.put("/records", isAdmin, leaveService.updateBulkLeave);

LeaveController.post("/", isUser, leaveService.createLeave);
LeaveController.get("/:id", isUser, leaveService.getLeave);
LeaveController.put("/:seq", isSupervisor, leaveService.updateLeave);
LeaveController.delete("/:seq", isUser, leaveService.deleteLeave);

export default LeaveController;
