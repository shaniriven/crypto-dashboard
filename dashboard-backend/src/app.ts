import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/database";
import authRoutes from "./features/auth/auth.routes";
import dashboardRoutes from "./features/dashboard/dashboard.routes";
import userRoutes from "./features/user/user.routes";
import { voteRoutes } from "./features/votes/vote.routes";

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: [
    "http://localhost:5173", // Local development
    "https://your-vercel-app-url.vercel.app" // Replace with your actual Vercel URL
  ],
  credentials: true
}));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/votes", voteRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT} `)
);
