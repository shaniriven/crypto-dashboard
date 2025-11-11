import { CryptodashTitle } from '@/components/dashTitle';
import { Button } from '@/components/ui/button';
import { api } from '@/services/api';
import type { IUser } from "@/types/user";
import { LogOut, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const Dashboard: React.FC = () => {
    const [user, setUser] = useState<IUser | null>(null);

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



    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-18">
                        {/* Title */}
                        <div className="flex items-center gap-3 mt-8">
                            <CryptodashTitle />
                        </div>

                        {/* User Info & Logout */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                <User className="w-5 h-5" />
                                <span className="font-medium">{user?.name}</span>
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
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* News Feed - Takes 2 columns on large screens
                    <div className="lg:col-span-2">
                        <NewsFeed limit={10} />
                    </div> */}

                    {/* Sidebar - placeholder for other widgets */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-2">
                                Welcome back, {user?.name}!
                            </h2>
                            <p className="text-gray-600 text-sm">
                                Your crypto dashboard is ready.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;