import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import { getDashboardData, getPrices, getTopCoins } from "./dashboard.controller";

const router = Router();
router.get("/getNews", requireAuth, getDashboardData);
router.get("/getPrices", requireAuth, getPrices);
router.get("/top-coins", requireAuth, getTopCoins);
export default router;
