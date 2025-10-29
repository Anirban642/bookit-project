import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
  title: string;
  location: string;
  imageUrl: string;
  description: string;
  price: number;
  category: string;
  createdAt: Date;
}

const ExperienceSchema = new Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IExperience>('Experience', ExperienceSchema);