import { Router } from "express";
import {
  signUp,
  signIn,
  getCurrentUser,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.get("/me", authenticate, getCurrentUser);

export default authRouter;
