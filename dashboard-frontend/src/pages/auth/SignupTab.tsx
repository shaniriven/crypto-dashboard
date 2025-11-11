import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { api } from "@/services/api";
import { Lock, MailIcon, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupTab() {
    //   const [user, setUser] = useState<any>(null);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    //   const [loading, setLoading] = useState(false);
    //   const [alertType, setAlertType] = useState<'success' | 'error' | ''>('');
    //   const [hasError, setHasError] = useState(false);
    //   const [onboarding_done, setOnboarding_done] = useState(false);
    //   const navigate = useNavigate();

    const signup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/signup", { username, email, password });
            if (res.status === 201) {
                const loginRes = await api.post("/auth/login", { username, password });
                localStorage.setItem("token", loginRes.data.token);
                localStorage.setItem("user", JSON.stringify(loginRes.data.user));
            }
            navigate("/onboarding");
        } catch (error: any) {
            if (error.response?.data?.error) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
        }
    }


    //     try {
    //       const avatarColor = UtilsService.avatarColor();
    //       const response = await authService.signUp({ username, email, password, avatarColor, onboarding_done });
    //       console.log('Registration successful:', response);

    //       // set logged in to true in local storage
    //       // set username in local storage
    //       // dispatch user to redux
    //       setUser(response.data.user);
    //       setAlertType('success');
    //     } catch (error) {
    //       setHasError(true);
    //       setAlertType('error');
    //       if (isAxiosError(error)) {
    //         const axiosError = error as AxiosError<{ message: string }>;
    //         setErrorMessage(axiosError.response?.data?.message || 'Registration failed. Please try again.');
    //       } else if (error instanceof Error) {
    //         setErrorMessage(error.message);
    //       } else {
    //         setErrorMessage('An unexpected error occurred. Please try again.');
    //       }
    //     } finally {
    //       setLoading(false);
    //     }
    //   }

    //   useEffect(() => {
    //     if (loading && !user) return;
    //     if (user) {
    //       navigate("/onboarding");
    //       setLoading(false);
    //     }
    //   }, [loading, user]);

    return (
        <form onSubmit={signup}>
            <Card>
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>
                        Create your account to start using CryptoDash
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 mt-2">
                    <div className="grid gap-3">
                        <InputGroup>
                            <InputGroupInput type="email" value={email} placeholder="Enter your email" id="email" onChange={(e) => setEmail(e.target.value)}
                            />
                            <InputGroupAddon>
                                <MailIcon />
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                    <div className="grid gap-3">
                        <InputGroup>
                            <InputGroupInput placeholder="Enter username" value={username} id="username" onChange={(e) => setUsername(e.target.value)}
                            />
                            <InputGroupAddon>
                                <User />
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                    <div className="grid gap-3">
                        <InputGroup>
                            <InputGroupInput placeholder="Enter password" value={password} type="password" id="password" onChange={(e) => setPassword(e.target.value)}
                            />
                            <InputGroupAddon>
                                <Lock />
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button type="submit" >Sign Up
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )

}
