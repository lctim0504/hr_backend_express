import express from "express";
import quotaService from "./Quota_service.js";

const QuotaController = express.Router();

QuotaController.post("/", quotaService.createUserQuota);
QuotaController.get("/:id", quotaService.getUserRemainQuota);
// QuotaController.put("/", quotaService.updateQuota);
QuotaController.delete("/:id", quotaService.deleteUserQuota);

export default QuotaController;
