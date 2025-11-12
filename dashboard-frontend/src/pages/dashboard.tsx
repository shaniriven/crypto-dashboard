import { InsightCard } from '@/components/InsightCard';
import { MemeCard } from '@/components/MemeCard';
import { NewsFeed } from '@/components/NewsFeed';
import { TopCoins } from '@/components/TopCoins';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { api } from '@/services/api';
import { getPersonalizedTopCoins } from '@/services/dashboardApi';
import type { ICoinLite } from '@/types/coins';
import type { INewsItem } from '@/types/dashboard';
import type { IUser } from "@/types/user";
import { LogOut, RefreshCw, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const [user, setUser] = useState<IUser | null>(null);
    const [coins, setCoins] = useState<ICoinLite[]>([]);
    const [news, setNews] = useState<INewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No token found");
                    return;
                }

                const res = await api.get<IUser>("/auth/currentUser", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(res.data);
            } catch {
                console.error("Failed to fetch user in dashboard");
            }
        };

        fetchUser();

    }, []);

    // get coins
    useEffect(() => {
        (async () => {
            try {
                const c = await getPersonalizedTopCoins();
                setCoins(c);
            } catch (e) {
                console.error("Failed to load top coins", e);
            }
        })();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        api.get("/dashboard/getNews", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                setNews(res.data.news);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Failed to fetch news:", error);
                setLoading(false);
            });

        api.get("/dashboard/getPrices", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                console.log("CoinGecko Raw Data:", res.data.prices);
            })
            .catch(err => console.error("Failed to fetch prices:", err))
    }, []);

    const handleRefreshAll = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("token");
            if (!token) return;

            // Re-fetch user (if needed)
            const userRes = await api.get<IUser>("/auth/currentUser", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(userRes.data);

            // Re-fetch dashboard data
            const [coinsData, newsRes] = await Promise.all([
                getPersonalizedTopCoins(),
                api.get("/dashboard/getNews", {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ]);

            setCoins(coinsData);
            setNews(newsRes.data.news);
        } catch (err) {
            console.error("Refresh all failed:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/"); // 
    };


    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center ">
                        {/* Title */}
                        <div className="flex items-center gap-3 mt-3">
                            <h1 className="text-5xl font-extrabold tracking-tight select-none mb-10">
                                <span className="text-transparent bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 bg-clip-text drop-shadow-[0_0_15px_rgba(100,100,100,0.6)]">
                                    CryptoDash
                                </span>
                            </h1>
                        </div>

                        {/* User Info & Logout */}
                        <div className="flex items-center gap-4 pb-3">
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                <User className="w-5 h-5" />
                                <span className="font-medium">{user?.username}</span>
                            </div>
                            {/* Refresh All Button */}
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-2"
                                onClick={handleRefreshAll}
                                title="Refresh all sections"
                            >
                                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                                Refresh
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-2"
                                onClick={handleLogout}
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-6">

                    {/* Sidebar — appears first on mobile, on the right on desktop */}
                    <div className="lg:col-start-2 lg:row-start-1 space-y-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                                Welcome back, {user?.username}!
                            </CardTitle>
                            <p className="text-gray-600 text-sm">
                                take a look at the latest crypto news and updates curated just for you
                            </p>
                        </div>
                        <MemeCard />
                        <TopCoins coins={coins} />
                    </div>

                    {/* News Feed — takes remaining space on large screens */}
                    <div className="lg:col-start-1 lg:row-start-1 space-y-6">
                        <InsightCard />
                        <NewsFeed news={news} />
                    </div>

                </div>
            </main>

        </div>
    );
};

export default Dashboard;