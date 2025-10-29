export interface Experience {
  _id: string;
  title: string;
  location: string;
  imageUrl: string;
  description: string;
  price: number;
  category: string;
  createdAt: string;
}

export interface Slot {
  _id: string;
  experienceId: string;
  slotDate: string;
  slotTime: string;
  availableSpots: number;
  totalSpots: number;
}

export interface Booking {
  experienceId: string;
  slotId: string;
  fullName: string;
  email: string;
  quantity: number;
  subtotal: number;
  taxes: number;
  total: number;
  promoCode?: string;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  data: {
    referenceId: string;
    fullName: string;
    email: string;
    total: number;
  };
}

export interface PromoCode {
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
}