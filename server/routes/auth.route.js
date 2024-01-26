import { Router } from "express";

//controller
import {
  signIn,
  signUp,
  googleAuth,
  signOut,
} from "../controller/auth.controller.js";

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/google", googleAuth);
router.get("/sign-out", signOut);

export default router;
