import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  experienceId: mongoose.Types.ObjectId;
  slotId: mongoose.Types.ObjectId;
  fullName: string;
  email: string;
  quantity: number;
  subtotal: number;
  taxes: number;
  total: number;
  promoCode?: string;
  referenceId: string;
  bookingDate: Date;
}

const BookingSchema = new Schema({
  experienceId: { type: Schema.Types.ObjectId, ref: 'Experience', required: true },
  slotId: { type: Schema.Types.ObjectId, ref: 'Slot', required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  quantity: { type: Number, required: true },
  subtotal: { type: Number, required: true },
  taxes: { type: Number, required: true },
  total: { type: Number, required: true },
  promoCode: { type: String },
  referenceId: { type: String, required: true, unique: true },
  bookingDate: { type: Date, default: Date.now }
});

export default mongoose.model<IBooking>('Booking', BookingSchema);