import express from "express";
import itemService from "./Item_service.js";
import { isAdmin, isUser } from "../../JWT_token.js";

const ItemController = express.Router();

ItemController.get("/departments", itemService.getDepartments);
ItemController.get("/userIds", itemService.getUserIds);
ItemController.get("/leavetypes", itemService.getLeaveTypes);
ItemController.get("/supervisor/:dpm", itemService.getDpmSupervisor);


export default ItemController;
