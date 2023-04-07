import express from "express";
import itemService from "./Item_service.js";
import { isAdmin, isUser } from "../../JWT_token.js";

const ItemController = express.Router();

ItemController.get("/departments", isUser, itemService.getDepartments);
ItemController.get("/userIds", isUser, itemService.getUserIds);
ItemController.get("/leavetypes", isUser, itemService.getLeaveTypes);
ItemController.get("/leavetypes/:id", isUser, itemService.getLeaveTypeDetail);
ItemController.get("/supervisor/:dpm", isUser, itemService.getDpmSupervisor);


export default ItemController;
