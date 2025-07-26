import mongoose, { Schema, Document } from 'mongoose';

export interface IFeedback extends Document {
  rating: number;
  comment: string;
  createdAt: Date;
}

const FeedbackSchema: Schema = new Schema({
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Feedback || mongoose.model<IFeedback>('Feedback', FeedbackSchema);
