import express from "express";
import LeaveService from "./Leave_service.js";

const LeaveController = express.Router();

LeaveController.get("/", LeaveService.getAllLeaves);

LeaveController.post("/", LeaveService.createLeave);
LeaveController.get("/:id", LeaveService.getLeave);
LeaveController.put("/:id", LeaveService.updateLeave);
LeaveController.delete("/:id", LeaveService.deleteLeave);

export default LeaveController;
