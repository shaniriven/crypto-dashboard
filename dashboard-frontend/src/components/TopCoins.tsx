import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPersonalizedTopCoins } from "@/services/dashboardApi";
import type { ICoinLite } from "@/types/coins";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { RefreshButton } from "./RefreshButton";

type Props = { coins: ICoinLite[] };

const formatCurrency = (n: number) =>
    new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export function TopCoins({ coins }: Props) {
    const [localCoins, setLocalCoins] = useState<ICoinLite[]>(coins);

    // Sync with parent prop changes
    useEffect(() => {
        setLocalCoins(coins);
    }, [coins]);

    const refreshCoins = async () => {
        const updated = await getPersonalizedTopCoins();
        setLocalCoins(updated);
    };

    return (
        <Card className="relative">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Top Coins</CardTitle>
                    <RefreshButton onRefresh={refreshCoins} />
                </div>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {localCoins.map((c) => {
                    const pct = c.price_change_percentage_24h ?? 0;
                    const isUp = pct >= 0;
                    return (
                        <div key={c.id} className="flex items-center gap-3 rounded-lg border p-3">
                            <img src={c.image} alt={c.name} className="h-6 w-6 rounded-full" />
                            <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium truncate">{c.name}</span>
                                    <span className="text-xs text-muted-foreground">{c.symbol}</span>
                                </div>
                                <div className="text-sm">{formatCurrency(c.current_price)}</div>
                                <div className={`flex items-center gap-1 text-xs ${isUp ? "text-green-600" : "text-red-600"}`}>
                                    {isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                    <span>{pct.toFixed(2)}%</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
}
