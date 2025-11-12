import { Document } from "mongoose";

export interface IUserDocument extends Document {
  _id: string;
  username: string;
  email: string;
  passwordHash: string;
  onBoarding_done: boolean;
  preferences?: {
    assets?: string[];         // Example: ["BTC", "ETH"]
    investorType?: string[];   // Example: ["HODLer", "Day Trader"]
    contentTypes?: string[];   // Example: ["News", "Charts", "Social"]
  };
  createdAt?: Date;
  updatedAt?: Date;
}