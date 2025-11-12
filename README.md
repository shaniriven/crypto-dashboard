# CryptoDash — Personalized Crypto Investor Dashboard

CryptoDash is a personalized dashboard for crypto investors.  
It learns from each user’s preferences through a short onboarding quiz and delivers daily AI insights, curated news, top coins, and memes — all in one clean interface.

---

## Features

### User & Auth
- Secure JWT authentication (signup/login)
- Onboarding flow that saves user preferences to MongoDB
- Custom-tailored dashboard 

### Dashboard Sections
- Market News from [CryptoPanic API](https://cryptopanic.com/)/static fallback
- Top Coins from [CoinGecko API](https://www.coingecko.com/)
- AI Insight of the Day powered by [Hugging Face Inference API](https://huggingface.co/)
- Meme of the Day from Reddit 
- Each component includes thumbs up/down voting and refresh controls

---

## Tech Stack

| Layer | Technology |
|--------|-------------|
| Frontend | React, Vite, TypeScript, Tailwind, Shadcn/UI |
| Backend | Node.js, Express, Mongoose |
| Database | MongoDB Atlas |
| AI API | Hugging Face (Mistral-7B / DeepSeek) |
| Crypto APIs | CoinGecko, CryptoPanic |
| Hosting | Frontend → Vercel, Backend → Render |
| Auth | JWT Tokens |

---

## Deployment Overview

### Frontend (Vercel)
1. Import project from GitHub  
2. Set **Root Directory:** `dashboard-frontend`  
3. Set **Build Command:** `npm run build`  
4. Set **Output Directory:** `dist`  
5. Add environment variable:  
   ```
   VITE_API_URL=https://your-backend.onrender.com
   ```

### Backend (Render)
1. Create new Web Service  
2. Set **Root Directory:** `dashboard-backend`  
3. Set **Start Command:** `npm start`  
4. Add environment variables:
   ```
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-secret-key
   HF_API_KEY=your-huggingface-token
   HF_MODEL=mistralai/Mistral-7B-Instruct-v0.3
   CRYPTOPANIC_API=https://cryptopanic.com/api/v1/posts
   CRYPTOPANIC_TOKEN=your-token
   ```

### Database (MongoDB Atlas)
- Create a free cluster at [MongoDB Atlas](https://cloud.mongodb.com/)
- Whitelist all IPs or your Render IP
- Get connection string and paste it in `MONGO_URI`

---

## Environment Variables

### Frontend (`.env`)
```
VITE_API_URL=https://your-backend.onrender.com
```

### Backend (`.env`)
```
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=supersecret
HF_API_KEY=your-huggingface-token
HF_MODEL=mistralai/Mistral-7B-Instruct-v0.3
CRYPTOPANIC_API=https://cryptopanic.com/api/v1/posts
CRYPTOPANIC_TOKEN=your-token
```

## Local Development

### Run backend
```bash
cd dashboard-backend
npm install
npm run dev
```

### Run frontend
```bash
cd dashboard-frontend
npm install
npm run dev
```

---
