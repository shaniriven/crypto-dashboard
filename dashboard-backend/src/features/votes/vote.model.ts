import mongoose, { Document, Schema } from "mongoose";

export interface IVote extends Document {
  voter_id: mongoose.Types.ObjectId;
  voter_pref: {
    assets: string[];
    investorType: string[];
    contentTypes: string[];
  };
  post_type: "Insight" | "News" | "Coin" | "Meme";
  vote: "like" | "undlike";
  meme_url?: string;
  news_id?: string;
  coin_symbol?: string;
  coin_price?: number;
  insight_text?: string;
}

const voteSchema = new Schema<IVote>(
  {
    voter_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    voter_pref: {
      assets: [String],
      investorType: [String],
      contentTypes: [String],
    },
    post_type: { type: String, required: true, enum: ["Insight", "News", "Coin", "Meme"] },
    vote: { type: String, required: true, enum: ["like", "undlike"] },
    meme_url: String,
    news_id: String,
    coin_symbol: String,
    coin_price: Number,
    insight_text: String,
  },
  { timestamps: true }
);

export const Vote = mongoose.model<IVote>("Vote", voteSchema);
