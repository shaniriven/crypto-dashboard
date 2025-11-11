import { api } from "@/services/api";
import type { ICoinLite } from "@/types/coins";

export const getTopCoins = async (): Promise<ICoinLite[]> => {
  const { data } = await api.get<{ coins: ICoinLite[] }>("/dashboard/top-coins");
  return data.coins;
};
