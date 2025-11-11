import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { api } from "@/services/api";
import { Lock, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function LoginTab() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const login = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login", { username, password });
            const currentUser = await api.get("/auth/currentUser", {
                headers: { Authorization: `Bearer ${res.data.token}` }
            });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(currentUser.data));

            if (currentUser.data.onBoarding_done) {
                navigate("/dashboard");
            } else {
                navigate("/onboarding");
            }

        } catch (error: any) {
            alert(error.response?.data?.error || "Login failed");
        }
    };

    return (
        <form onSubmit={login}>
            <Card>
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>
                        Login to your account and continue to enjoy CryptoDash
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 mt-2">
                    <div className="grid gap-3">
                        <InputGroup>
                            <InputGroupInput placeholder="Enter username" id="username"
                                value={username} onChange={(e) => setUsername(e.target.value)} />
                            <InputGroupAddon>
                                <User />
                            </InputGroupAddon>

                        </InputGroup>
                    </div>
                    <div className="grid gap-3">
                        <InputGroup>
                            <InputGroupInput placeholder="Enter password" type="password" id="password"
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                            <InputGroupAddon>
                                <Lock />
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                    {/* <div className="grid gap-3">
                    <div className="flex items-center gap-3">
                        <Checkbox id="keepLoggedIn" />
                        <Label htmlFor="keepLoggedIn">Keep me signed in</Label>
                    </div>
                </div> */}
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button type="submit" >Sign In
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}