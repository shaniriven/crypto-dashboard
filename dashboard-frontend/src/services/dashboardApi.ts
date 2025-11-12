import { api } from "@/services/api";
import type { ICoinLite } from "@/types/coins";
export interface IInsightResponse {
  insight: string;
}
export const getTopCoins = async (): Promise<ICoinLite[]> => {
  const { data } = await api.get<{ coins: ICoinLite[] }>("/dashboard/top-coins");
  return data.coins;
};

export const getPersonalizedTopCoins = async (): Promise<ICoinLite[]> => {
  const { data } = await api.get<{ coins: ICoinLite[] }>("/dashboard/personalized-top-coins");
  return data.coins;
};

export async function getDailyInsight(): Promise<string> {
  const token = localStorage.getItem("token");
  const { data } = await api.get<IInsightResponse>("/dashboard/insight", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data.insight;
}

export async function getMeme() {
  const token = localStorage.getItem("token");
  const res = await api.get("/dashboard/getMeme", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.meme;
}