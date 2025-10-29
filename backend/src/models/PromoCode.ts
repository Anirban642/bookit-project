import mongoose, { Schema, Document } from 'mongoose';

export interface IPromoCode extends Document {
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  active: boolean;
}

const PromoCodeSchema = new Schema({
  code: { type: String, required: true, unique: true },
  discountType: { type: String, required: true, enum: ['percentage', 'flat'] },
  discountValue: { type: Number, required: true },
  active: { type: Boolean, default: true }
});

export default mongoose.model<IPromoCode>('PromoCode', PromoCodeSchema);