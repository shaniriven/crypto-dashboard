import type { INewsItem } from "@/types/dashboard";
import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { VoteButtons } from "./VoteButtons";

interface NewsFeedProps {
    news: INewsItem[];
}

export function NewsFeed({ news }: NewsFeedProps) {

    // Debug: Log the first news item to check URL
    if (news && news.length > 0) {
        console.log("First news item:", news[0]);
    }

    const formatTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (seconds < 60) return 'just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        return `${Math.floor(seconds / 86400)}d ago`;
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    News Feed
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {news && news.length > 0 ? news.map((post) => (
                        <div
                            key={post.id}
                            className="block p-3 rounded-lg border hover:bg-accent transition-colors"
                        >
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                    <h3 className="font-medium line-clamp-2 mb-1">
                                        {post.title}
                                    </h3>
                                    {post.description && (
                                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                                            {post.description}
                                        </p>
                                    )}
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span>{post.source}</span>
                                        <span>•</span>
                                        <span>{formatTimeAgo(post.publishedAt)}</span>
                                    </div>
                                    <VoteButtons postType="News" data={{ news_id: post.id }} />
                                </div>
                                <a
                                    href={post.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <ExternalLink className="w-4 h-4 flex-shrink-0" />
                                </a>
                            </div>
                        </div>
                    )) : (
                        <p className="text-sm text-muted-foreground text-center py-4">No news available</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}