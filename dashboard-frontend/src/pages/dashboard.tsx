import { CryptodashTitle } from '@/components/dashTitle';
import { NewsFeed } from '@/components/NewsFeed';
import { TopCoins } from '@/components/TopCoins';
import { Button } from '@/components/ui/button';
import { api } from '@/services/api';
import { getTopCoins } from '@/services/dashboardApi';
import type { ICoinLite } from '@/types/coins';
import type { INewsItem } from '@/types/dashboard';
import type { IUser } from "@/types/user";
import { LogOut, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const Dashboard: React.FC = () => {
    const [user, setUser] = useState<IUser | null>(null);
    const [coins, setCoins] = useState<ICoinLite[]>([]);
    const [news, setNews] = useState<INewsItem[]>([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        (async () => {
            try {
                const c = await getTopCoins();
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

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center ">
                        {/* Title */}
                        <div className="flex items-center gap-3 mt-3">
                            <CryptodashTitle />
                        </div>

                        {/* User Info & Logout */}
                        <div className="flex items-center gap-4 pb-3">
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                <User className="w-5 h-5" />
                                <span className="font-medium">{user?.username}</span>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-2"
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Sidebar — appears first on mobile, on the right on desktop */}
                    <div className="lg:col-start-3 lg:row-start-1 space-y-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-2">
                                Welcome back, {user?.username}!
                            </h2>
                            <p className="text-gray-600 text-sm">
                                take a look at the latest crypto news and updates curated just for you
                            </p>
                        </div>
                        <TopCoins coins={coins} />
                    </div>

                    {/* News Feed — takes 2 columns on large screens */}
                    <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1">
                        <NewsFeed news={news} />
                    </div>

                </div>
            </main>

        </div>
    );
};

export default Dashboard;