import express from "express";
import quotaService from "./Quota_service.js";

const QuotaController = express.Router();

// QuotaController.get("/", quotaService.getAllQuotas);

QuotaController.post("/", quotaService.createQuota);
QuotaController.get("/:id", quotaService.getQuota);
// QuotaController.put("/", quotaService.updateQuota);
// QuotaController.delete("/:id", quotaService.deleteQuota);

export default QuotaController;
