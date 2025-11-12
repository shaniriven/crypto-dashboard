import { Request, Response } from "express";
import { User } from "../../auth/user.model";
import { IUserDocument } from "../../user/user.interface";
import { InsightModel } from "./insight.schema";
import { getDailyInsightForUser } from "./insight.service";

export const getInsight = async (req: Request, res: Response) => {
  try {
    console.log("=== Insight API Called ===");
    const userId = (req as any).user.userId;
    console.log("User ID:", userId);
    
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const user = await User.findById(userId) as IUserDocument | null;
    console.log("User found:", user ? "Yes" : "No");
    
    if (!user) return res.status(404).json({ error: "User not found" });

    console.log("Generating insight for user:", user.username);
    const text = await getDailyInsightForUser(user);
    console.log("Insight generated:", text.substring(0, 50) + "...");
    
    res.json({ insight: text });
  } catch (err: any) {
    console.error("Error in getInsight:", err);
    res.status(500).json({ insight: "Unable to load insight today. ", error: err.message });
  }
};

export const clearInsightCache = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const today = new Date().toISOString().slice(0, 10);
    await InsightModel.deleteOne({ user: userId, date: today });
    
    res.json({ message: "Insight cache cleared for today" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
