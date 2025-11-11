import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import { getCurrentUser, login, signup } from "./auth.controller";


const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/currentUser", requireAuth, getCurrentUser);
export default router;
