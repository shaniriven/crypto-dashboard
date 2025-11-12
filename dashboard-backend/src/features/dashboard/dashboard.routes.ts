import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import { getDashboardData, getMeme, getPersonalizedTopCoins, getPrices, getTopCoins } from "./dashboard.controller";
import { clearInsightCache, getInsight } from "./models/insight.controller";

const router = Router();
router.get("/getNews", requireAuth, getDashboardData);
router.get("/getPrices", requireAuth, getPrices);
router.get("/top-coins", requireAuth, getTopCoins);
router.get("/personalized-top-coins", requireAuth, getPersonalizedTopCoins);
router.get("/insight", requireAuth, getInsight);
router.delete("/insight/cache", requireAuth, clearInsightCache);
router.get("/getMeme", requireAuth, getMeme);
export default router;
