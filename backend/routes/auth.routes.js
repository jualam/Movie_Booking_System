import { Router } from "express";
import { signUp, signIn } from "../controllers/auth.controller.js";

const authRouter = Router();

//path : /api/v1/auth/signUp or signIn or signOut (POST Method)

authRouter.post("/signup", signUp);

authRouter.post("/signin", signIn);

export default authRouter;
