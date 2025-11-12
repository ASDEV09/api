import express from "express";
import { getProfile, updateProfile, upload } from "../controller/userController.mjs";

const router = express.Router();

// GET profile
router.get("/profile", getProfile);

// POST edit profile (avatar optional)
router.post("/edit-profile", upload.single("avatar"), updateProfile);

export default router;
