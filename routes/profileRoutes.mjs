import profileController from '../controller/profileController.mjs';
import express from 'express'

const profileRouter = express.Router();

profileRouter
    .get('/', profileController.index)
    .post('/', profileController.add) // 🟢 Add this line

export default profileRouter;