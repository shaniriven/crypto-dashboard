import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/database";
import authRoutes from "./features/auth/auth.routes";
import dashboardRoutes from "./features/dashboard/dashboard.routes";
import userRoutes from "./features/user/user.routes";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/dashboard", dashboardRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT} `)
);
