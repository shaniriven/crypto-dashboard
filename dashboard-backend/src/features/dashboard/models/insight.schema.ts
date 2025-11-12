import mongoose, { Document, Schema } from "mongoose";

export interface IInsight extends Document {
  user: mongoose.Types.ObjectId;
  date: string;        // YYYY-MM-DD
  text: string;
}

const InsightSchema = new Schema<IInsight>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", index: true, required: true },
    date: { type: String, index: true, required: true },
    text: { type: String, required: true }
  },
  { timestamps: true }
);

InsightSchema.index({ user: 1, date: 1 }, { unique: true });

export const InsightModel = mongoose.model<IInsight>("Insight", InsightSchema);
