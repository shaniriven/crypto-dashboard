import { InferenceClient } from "@huggingface/inference";
import type { IUserDocument } from "../../user/user.interface";
import { InsightModel } from "../models/insight.schema";

const TODAY = () => new Date().toISOString().slice(0, 10);

function buildPrompt(user: IUserDocument) {
    const prefs = user.preferences ?? {};
    const assets = prefs.assets?.length ? prefs.assets.join(", ") : "BTC, ETH";
    const investorType = prefs.investorType?.length ? prefs.investorType.join(", ") : "HODLer";
    const contentTypes = prefs.contentTypes?.length ? prefs.contentTypes.join(", ") : "Market News";

    return `
You are a helpful crypto investing coach. 
User profile:
- Investor is: ${investorType}
- Interested Assets: ${assets}
- Content Preference: ${contentTypes}

Task:
Generate one short, friendly, realistic insight for the user's daily dashboard. provide ONE practical, "insight of the day".
- Keep it general (no specific financial advice or guaranteed outcomes).
- Optionally suggest one actionable next step (e.g., setting an alert, reading about a topic, noticing a metric).
- Keep tone concise and friendly. you can be slightly fun.
`.trim();
}

const FALLBACK_TEXT = `Consider setting simple price alerts for the top coins you follow and review 24h vs 7d momentum before making moves. 
Skim headlines for macro catalysts and watch BTC dominance to gauge risk appetite.`;

export async function getDailyInsightForUser(user: IUserDocument): Promise<string> {

    function cleanInsightText(text: string): string {
        if (!text) return "";

        return text
            // Remove asterisks and markdown symbols
            .replace(/\*/g, "")
            // Replace multiple line breaks with a single space
            .replace(/(\r\n|\n|\r)+/g, " ")
            // Collapse multiple spaces
            .replace(/\s+/g, " ")
            // Trim leading/trailing whitespace
            .trim();
    }

    const today = TODAY();

    const model = process.env.HF_MODEL!;

    const prompt = buildPrompt(user);

    const client = new InferenceClient(process.env.HF_API_KEY!);
    try {
        const chat = await client.chatCompletion({
            model: model,
            messages: [
                {
                    role: "system",
                    content: "You are a friendly crypto investing insight assistant. Avoid hype, avoid guarantees."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 200,
            temperature: 0.7
        });

        const text =
            chat.choices?.[0]?.message?.content?.trim() ||
            FALLBACK_TEXT;

            const cleanedText = cleanInsightText(text);
        const saved = await InsightModel.findOneAndUpdate(
            { user: user._id, date: today },
            { text: cleanedText },
            { upsert: true, new: true }
        );

        return saved.text;

    } catch (err: any) {
        console.error("HF API call failed:", err.message);
        // 4) Fallback + cache so we don't hit the model repeatedly today
        const saved = await InsightModel.findOneAndUpdate(
            { user: user._id, date: today },
            { text: FALLBACK_TEXT },
            { upsert: true, new: true }
        );
        return saved.text;
    }
}
