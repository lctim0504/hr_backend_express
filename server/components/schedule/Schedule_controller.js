import express from "express";
import scheduleService from "./Schedule_service.js";
import { isAdmin, isUser } from "../../JWT_token.js";

const ScheduleController = express.Router();

ScheduleController.get("/", isAdmin, scheduleService.getAllSchedules);

ScheduleController.post("/", isAdmin, scheduleService.createSchedule); //上傳新班表
ScheduleController.get("/:id", isUser, scheduleService.getSchedule); //取得使用者每個月的班表

export default ScheduleController;
