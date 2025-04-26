import express from "express";
import {
  bookTickets,
  getBookingHistory,
  getTicketInfoById,
} from "../controllers/booking.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

// Book tickets
router.post("/", authenticate, bookTickets);

// Get user's booking history
router.get("/history", authenticate, getBookingHistory);

// Get Specific booking history
router.get("/tickets/:id", authenticate, getTicketInfoById);

export default router;
