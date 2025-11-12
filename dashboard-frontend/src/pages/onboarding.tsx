
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { api } from "@/services/api"
// import { onboardingService } from "@/services/api/onboarding/onboarding.service"
import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

// Step data
const steps = [
    {
        title: "What crypto assets are you interested in?",
        options: [
            "Bitcoin (BTC)",
            "Ethereum (ETH)",
            "Solana (SOL)",
            "Polygon (MATIC)",
            "Avalanche (AVAX)",
            "Cardano (ADA)",
            "Dogecoin (DOGE)",
            "Uniswap (UNI)"
        ]
    },
    {
        title: "What type of investor are you?",
        options: [
            "HODLer",
            "Day Trader",
            "DeFi Farmer",
            "NFT Collector",
            "Long-term Portfolio Builder"
        ]
    },
    {
        title: "What kind of content would you like to see?",
        options: [
            "Market News",
            "Charts and Technical Analysis",
            "Social / Community Trends",
            "Learning / Education",
            "Fun / Memes"
        ]
    }
]

export default function Onboarding() {
    const navigate = useNavigate()
    const [stepIndex, setStepIndex] = useState(0)
    const [answers, setAnswers] = useState<Record<number, string[]>>({})
    const [loading, setLoading] = useState(false);
    // const [errorMessage, setErrorMessage] = useState('');
    const currentStep = steps[stepIndex];
    // const [hasError, setHasError] = useState(false);

    // Map UI labels => stable keys expected by backend
    const assetLabelToCode: Record<string, string> = useMemo(() => ({
        "Bitcoin (BTC)": "BTC",
        "Ethereum (ETH)": "ETH",
        "Solana (SOL)": "SOL",
        "Polygon (MATIC)": "MATIC",
        "Avalanche (AVAX)": "AVAX",
        "Cardano (ADA)": "ADA",
        "Dogecoin (DOGE)": "DOGE",
        "Uniswap (UNI)": "UNI",
    }), [])

    const buildUserPreferences = () => {
        const a0 = (answers[0] || []).map((label) => assetLabelToCode[label] ?? label)
        const a1 = answers[1] || [] // investor profiles as selected labels
        const a2 = answers[2] || [] // content preferences as selected labels
        return {
            cryptoAssets: a0,
            investorProfiles: a1,
            contentPreferences: a2,
        }
    }

    const toggleOption = (option: string) => {
        const selected = answers[stepIndex] || []
        const updated = selected.includes(option)
            ? selected.filter((item) => item !== option)
            : [...selected, option]

        setAnswers({ ...answers, [stepIndex]: updated })
    }

    const finishOnboarding = async () => {
        setLoading(true);
        const userPreferences = buildUserPreferences();
        try {
            const token = localStorage.getItem("token");
            const res = await api.post("/user/preferences", {
                assets: userPreferences.cryptoAssets,
                investorType: userPreferences.investorProfiles,
                contentTypes: userPreferences.contentPreferences
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.status === 200) {
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Error saving preferences:", error);
        } finally {
            setLoading(false);
        }
    }


    const next = () => {
        if (stepIndex < steps.length - 1) setStepIndex(stepIndex + 1)
        else {
            finishOnboarding();
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <Card className="w-full max-w-lg">
                <div className="flex flex-col items-center ">
                    <h1 className="text-5xl font-extrabold tracking-tight select-none mb-10">
                        <span className="text-transparent bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 bg-clip-text drop-shadow-[0_0_15px_rgba(100,100,100,0.6)]">
                            CryptoDash
                        </span>
                    </h1>
                    <span className="text-md font-normal text-muted-foreground">
                        Personalize your experience
                    </span>
                </div>
                <CardHeader>
                    <CardTitle>{currentStep.title}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    {currentStep.options.map((option) => (
                        <div key={option} className="flex items-center space-x-3">
                            <Checkbox
                                checked={answers[stepIndex]?.includes(option) || false}
                                onCheckedChange={() => toggleOption(option)}
                            />
                            <span>{option}</span>
                        </div>
                    ))}
                </CardContent>

                <CardFooter className="flex flex-col gap-4">
                    {/* Pagination dots */}
                    <div className="flex justify-center items-center gap-2">
                        {steps.map((_, idx) => (
                            <button
                                key={idx}
                                type="button"
                                aria-label={`Go to step ${idx + 1}`}
                                className={`h-2.5 w-2.5 rounded-full transition-colors outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background
                                    ${idx === stepIndex ? 'bg-primary' : 'bg-muted hover:bg-muted-foreground/50'}`}
                                onClick={() => setStepIndex(idx)}
                                disabled={loading}
                            />
                        ))}
                    </div>
                    {/* Navigation buttons */}
                    <div className="flex w-full justify-between">
                        <Button
                            variant="outline"
                            disabled={stepIndex === 0 || loading}
                            onClick={() => setStepIndex(stepIndex - 1)}
                        >
                            Back
                        </Button>
                        <Button onClick={next} disabled={loading}>
                            {loading ? 'Saving...' : stepIndex < steps.length - 1 ? "Next" : "Finish"}
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
