import express from "express";
import multer from "multer";
import profileController from "../controller/profileController.mjs";

const router = express.Router();

// ⚙️ Multer memory storage (no local folder)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 🛠 Routes
router.get("/", profileController.index);
router.post("/", upload.single("avatar"), profileController.add);

export default router;
