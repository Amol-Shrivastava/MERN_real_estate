import { Router } from "express";

//controller
import { signIn, signUp, googleAuth } from "../controller/auth.controller.js";

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/google", googleAuth);

export default router;
