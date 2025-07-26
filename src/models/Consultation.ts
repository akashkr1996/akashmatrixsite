import mongoose, { Schema, Document } from 'mongoose';

export interface IConsultation extends Document {
  name: string;
  phone: string;
  email: string;
  category: string;
  problem: string;
  upiScreenshotUrl: string;
  status: 'pending' | 'done';
  createdAt: Date;
}

const ConsultationSchema: Schema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  category: { type: String, required: true },
  problem: { type: String, required: true },
  upiScreenshotUrl: { type: String, required: true },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Consultation || mongoose.model<IConsultation>('Consultation', ConsultationSchema);
