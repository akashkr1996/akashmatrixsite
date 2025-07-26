import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  coverImageUrl: string;
  content: string;
  tags: string[];
  embeds: {
    youtube?: string;
    instagram?: string;
    linkedin?: string;
  };
  createdAt: Date;
}

const BlogSchema: Schema = new Schema({
  title: { type: String, required: true },
  coverImageUrl: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  embeds: {
    youtube: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
