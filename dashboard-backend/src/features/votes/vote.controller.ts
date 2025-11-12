import { Request, Response } from "express";
import { User } from "../auth/user.model";
import { Vote } from "./vote.model";

export const castVote = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const { post_type, vote, meme_url, news_id, coin_symbol, coin_price, insight_text } = req.body;

    const voteDoc = await Vote.create({
      voter_id: user._id,
      voter_pref: user.preferences,
      post_type,
      vote,
      meme_url,
      news_id,
      coin_symbol,
      coin_price,
      insight_text,
    });

    res.status(201).json(voteDoc);
  } catch (err: any) {
    console.error("Vote error:", err.message);
    res.status(500).json({ error: err.message });
  }
};
