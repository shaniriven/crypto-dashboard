import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMeme } from "@/services/dashboardApi";
import { useEffect, useState } from "react";
import { RefreshButton } from "./RefreshButton";
import { VoteButtons } from "./VoteButtons";

export function MemeCard() {
    const [meme, setMeme] = useState<{ title: string; image: string; postUrl: string } | null>(null);


    const fetchMeme = async () => {
        const m = await getMeme();
        setMeme(m);
    };

    useEffect(() => {
        fetchMeme();
    }, []);

    if (!meme) return null;

    return (
        <Card className="bg-white rounded-lg shadow p-4 max-w-lg relative">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Meme of the Day</CardTitle>
                    <RefreshButton onRefresh={fetchMeme} />
                </div>
            </CardHeader>
            <CardContent>
                <a href={meme.postUrl} target="_blank" rel="noopener noreferrer">
                    <img
                        src={meme.image}
                        alt={meme.title}
                        className="rounded-lg w-full object-cover max-h-64"
                    />
                </a>
                <p className="text-sm mt-2 text-gray-700 line-clamp-2 text-center">{meme.title}</p>
                <VoteButtons postType="Meme" data={{ meme_url: meme.image }} />
            </CardContent>
        </Card>
    );
}
