import { api } from "@/services/api";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";

interface Props {
    postType: "Insight" | "News" | "Coin" | "Meme";
    data?: {
        meme_url?: string;
        news_id?: number;
        coin_symbol?: string;
        coin_price?: number;
        insight_text?: string;
    };
}

export function VoteButtons({ postType, data }: Props) {
    const [vote, setVote] = useState<"like" | "undlike" | null>(null);
    const [loading, setLoading] = useState(false);

    const handleVote = async (direction: "like" | "undlike") => {
        if (loading) return;
        setLoading(true);
        setVote(direction);

        try {
            const token = localStorage.getItem("token");
            await api.post(
                "/votes/cast",
                { post_type: postType, vote: direction, ...data },
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (err) {
            console.error("Vote failed:", err);
        } finally {
            setLoading(false);
        }
    };

    const base = "flex items-center gap-1 cursor-pointer text-gray-500 hover:text-primary transition";

    return (
        <div className="flex justify-end gap-3 mt-4">
            <button
                className={`${base} ${vote === "like" ? "text-green-600" : ""}`}
                onClick={() => handleVote("like")}
                disabled={loading}
            >
                <ThumbsUp size={16} className="flex-shrink-0" /> <span className="text-sm leading-none">Like</span>
            </button>
            <button
                className={`${base} ${vote === "undlike" ? "text-red-600" : ""}`}
                onClick={() => handleVote("undlike")}
                disabled={loading}
            >
                <ThumbsDown size={16} className="flex-shrink-0" /> <span className="text-sm leading-none">Unlike</span>
            </button>
        </div>
    );
}
