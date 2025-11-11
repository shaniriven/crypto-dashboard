import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import { savePreferences } from "./user.controller";

const router = Router();

router.post("/preferences", requireAuth, savePreferences);

export default router;