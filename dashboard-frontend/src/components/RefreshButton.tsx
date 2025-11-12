import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import { useState } from "react";

interface Props {
    onRefresh: () => Promise<void> | void;
}

export function RefreshButton({ onRefresh }: Props) {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        if (loading) return;
        setLoading(true);
        try {
            await onRefresh();
        } finally {
            // Small visual delay for smooth animation
            setTimeout(() => setLoading(false), 400);
        }
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={handleClick}
            className="text-muted-foreground hover:text-primary absolute top-2 right-2"
            title="Refresh"
            disabled={loading}
        >
            <RotateCw
                className={`h-4 w-4 transition-transform duration-500 ${loading ? "animate-spin" : ""
                    }`}
            />
        </Button>
    );
}
