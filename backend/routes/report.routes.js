import express from "express";
import { getDailyTicketSales } from "../controllers/report.controller.js";
import { requireAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/sales/daily", requireAdmin, getDailyTicketSales);

export default router;
