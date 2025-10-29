import mongoose, { Schema, Document } from 'mongoose';

export interface ISlot extends Document {
  experienceId: mongoose.Types.ObjectId;
  slotDate: Date;
  slotTime: string;
  availableSpots: number;
  totalSpots: number;
  createdAt: Date;
}

const SlotSchema = new Schema({
  experienceId: { type: Schema.Types.ObjectId, ref: 'Experience', required: true },
  slotDate: { type: Date, required: true },
  slotTime: { type: String, required: true },
  availableSpots: { type: Number, required: true },
  totalSpots: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ISlot>('Slot', SlotSchema);