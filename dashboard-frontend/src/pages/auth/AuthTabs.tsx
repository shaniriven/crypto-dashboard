
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginTab from "@/pages/auth/LoginTab";
import SignupTab from "./SignupTab";

export default function AuthTabs() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-lg ring-1 ring-gray-200 min-h-[550px]">
                <div className="p-6 text-center">
                    <h1 className="text-5xl font-extrabold tracking-tight select-none mb-10">
                        <span className="text-transparent bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 bg-clip-text drop-shadow-[0_0_15px_rgba(100,100,100,0.6)]">
                            CryptoDash
                        </span>
                    </h1>
                    <Tabs defaultValue="login">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="login">Sign In</TabsTrigger>
                            <TabsTrigger value="signup">Sign Up</TabsTrigger>
                        </TabsList>

                        <TabsContent value="login" className="mt-7">
                            <LoginTab />
                        </TabsContent>

                        <TabsContent value="signup" className="mt-7">
                            <SignupTab />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}