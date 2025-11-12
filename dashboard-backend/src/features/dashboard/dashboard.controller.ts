import { Request, Response } from "express";
import { User } from "../auth/user.model";
import { DashboardService } from "./dashboard.services";
import { staticNews } from "./staticNews";

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    const news = await DashboardService.getNews();

    res.json({
      news,
      insight: "Your personalized AI insight will appear here soon.",
      meme: "https://i.imgflip.com/4t0m5.jpg"
    });

  } catch (err: any) {
    console.error("News API failed → sending fallback news:", err.message);

    res.json({
      news: staticNews,
      insight: "Your personalized AI insight will appear here soon.",
      meme: "https://i.imgflip.com/4t0m5.jpg"
    });
  }
};

export const getPrices = async (req: Request, res: Response) => {
  try {
    const prices = await DashboardService.getCoinPrices();
    res.json({ prices }); 
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getTopCoins = async (_req: Request, res: Response) => {
  try {
    const coins = await DashboardService.getTopCoins(6);
    res.json({ coins });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch coins" });
  }
};

export const getMeme = async (req: Request, res: Response) => {
  try {
    const meme = await DashboardService.getRandomMeme();
    res.json({ meme });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getPersonalizedTopCoins = async (req: Request, res: Response) => {
  try {
    const userId = (req as any)?.user?.userId;
    const limit = 6;

    const user = await User.findById(userId);
    const prefAssets = user?.preferences?.assets || [];

    const allCoins = await DashboardService.getTopCoins(20);

    let preferredCoins: any[] = [];

    if (prefAssets.length > 0) {
      preferredCoins = allCoins.filter((coin) =>
        prefAssets.includes(coin.symbol.toUpperCase())
      );
    }

    if (preferredCoins.length >= limit) {
      const shuffled = preferredCoins.sort(() => Math.random() - 0.5);
      return res.json({ coins: shuffled.slice(0, limit) });
    }

    const remaining = limit - preferredCoins.length;
    const fillerCoins = allCoins
      .filter((coin) => !prefAssets.includes(coin.symbol.toUpperCase()))
      .slice(0, remaining);

    const finalCoins = [...preferredCoins, ...fillerCoins];
    res.json({ coins: finalCoins });
  } catch (err: any) {
    console.error("Error in getPersonalizedTopCoins:", err.message);
    res
      .status(500)
      .json({ error: err.message || "Failed to fetch personalized coins" });
  }
};