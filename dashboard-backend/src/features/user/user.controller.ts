import { Request, Response } from 'express';
import { User } from "../auth/user.model";

export const savePreferences = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const { assets, investorType, contentTypes } = req.body;

  await User.findByIdAndUpdate(userId, {
    preferences: { assets, investorType, contentTypes },
    onBoarding_done: true 
  });

  res.json({ message: "Preferences saved" });
};
