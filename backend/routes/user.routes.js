// routes/user.routes.js
import { Router } from "express";
import {
  updateProfile,
  updatePassword,
} from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

// Protected routes (require valid JWT)
router.patch("/profile", authenticate, updateProfile);
router.patch("/password", authenticate, updatePassword);

export default router;
