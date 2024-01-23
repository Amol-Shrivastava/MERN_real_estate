import { Router } from "express";
import { testAPI, updateUserInfo } from "../controller/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = Router();

router.get("/", testAPI);
router.post("/update/:id", verifyToken, updateUserInfo);

export default router;
