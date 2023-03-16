import express from "express";
import scheduleService from "./Schedule_service.js";

const ScheduleController = express.Router();

ScheduleController.get("/", scheduleService.getAllSchedules);

ScheduleController.post("/", scheduleService.createSchedule); //上傳新班表
ScheduleController.get("/:id", scheduleService.getSchedule); //取得使用者每個月的班表

export default ScheduleController;
