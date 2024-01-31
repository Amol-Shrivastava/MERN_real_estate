import { Router } from "express";
import {
  testAPI,
  updateUserInfo,
  deleteUser,
  getUserListings,
} from "../controller/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = Router();

router.get("/", testAPI);
router.post("/update/:id", verifyToken, updateUserInfo);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/get_listings/:id", verifyToken, getUserListings);

export default router;
