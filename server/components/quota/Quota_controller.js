import express from "express";
import quotaService from "./Quota_service.js";
import { isAdmin, isUser } from "../../JWT_token.js";

const QuotaController = express.Router();

QuotaController.post("/", isAdmin, quotaService.createUserQuota);
QuotaController.get("/:id", isUser, quotaService.getUserRemainQuota);

// QuotaController.put("/", isAdmin, quotaService.updateUserQuota);
QuotaController.delete("/:id", isAdmin, quotaService.deleteUserQuota);

export default QuotaController;
