import { Request, Response } from "express";
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
