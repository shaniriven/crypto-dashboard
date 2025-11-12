import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import { castVote } from "./vote.controller";

const router = Router();

router.post("/cast", requireAuth, castVote);

export const voteRoutes = router;
