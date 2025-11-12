import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginTab from "@/pages/auth/LoginTab";
import { CryptodashTitle } from "../../components/DashTitle";
import SignupTab from "./SignupTab";

export default function AuthTabs() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-lg ring-1 ring-gray-200 min-h-[550px]">
                <div className="p-6 text-center">
                    <CryptodashTitle />
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