import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDailyInsight } from "@/services/dashboardApi";
import { useEffect, useState } from "react";
import { RefreshButton } from "./RefreshButton";
import { VoteButtons } from "./VoteButtons";

export function InsightCard() {
    const [insight, setInsight] = useState<string>("");
    const [loading, setLoading] = useState(true);

    const fetchInsight = async () => {
        setLoading(true);
        try {
            const text = await getDailyInsight();
            setInsight(text);
        } catch {
            setInsight("Fallback insight text...");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInsight();
    }, []);

    return (
        <Card className="bg-white rounded-lg shadow w-full overflow-hidden relative">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-gray-900">AI Insight of the Day</CardTitle>
                    <RefreshButton onRefresh={fetchInsight} />
                </div>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="animate-pulse space-y-2">
                        <div className="h-4 bg-muted rounded w-3/4" />
                        <div className="h-4 bg-muted rounded w-2/3" />
                        <div className="h-4 bg-muted rounded w-1/2" />
                    </div>
                ) : (
                    <>
                        <p className="text-sm text-gray-700 leading-6 whitespace-pre-line break-words">{insight}</p>
                        <VoteButtons postType="Insight" data={{ insight_text: insight }} />
                    </>
                )}
            </CardContent>
        </Card>
    );
}
