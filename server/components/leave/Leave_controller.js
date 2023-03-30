import express from "express";
import leaveService from "./Leave_service.js";
import { isAdmin, isSupervisor, isUser } from "../../JWT_token.js";

const LeaveController = express.Router();

LeaveController.get("/", isAdmin, leaveService.getAllLeaves);
LeaveController.get("/filter", isSupervisor, leaveService.getFilterLeave); //主管取得部門請假資料

LeaveController.post("/", isUser, leaveService.createLeave);
LeaveController.get("/:id", isUser, leaveService.getLeave);
LeaveController.put("/:id", isSupervisor, leaveService.updateLeave);
LeaveController.put("/", isAdmin, leaveService.updateBulkLeave);
LeaveController.delete("/:id", isUser, leaveService.deleteLeave);

export default LeaveController;
