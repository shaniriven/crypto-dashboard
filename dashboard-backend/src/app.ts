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

// Allow requests from Vercel (production + all preview deployments)
const allowedOrigins = [
  "http://localhost:5173", // Local development
  /^https:\/\/crypto-dashboard-.*\.vercel\.app$/, // All Vercel deployments
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // Check if origin matches any allowed pattern
    const isAllowed = allowedOrigins.some(pattern => 
      typeof pattern === 'string' ? pattern === origin : pattern.test(origin)
    );
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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
