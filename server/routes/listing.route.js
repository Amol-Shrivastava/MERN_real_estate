import { Router } from "express";
import {
  createListing,
  deleteListing,
} from "../controller/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = Router();

router.post("/create-listing", verifyToken, createListing);
router.delete("/delete-listing/:id", verifyToken, deleteListing);

export default router;
