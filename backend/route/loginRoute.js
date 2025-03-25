import express from "express";
import signupController from "../controllers/signupController.js";
import loginController from "../controllers/loginController.js";
import authUser from "../middleware/authUser.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/verify", authUser);

export default router;
