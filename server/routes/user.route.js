import { Router } from "express";
import { testAPI } from "../controller/user.controller.js";

const router = Router();

router.get("/", testAPI);

export default router;
