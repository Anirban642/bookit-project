import axios from 'axios';
import type { Experience, Slot, Booking, BookingResponse, PromoCode } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const experienceAPI = {
  getAll: async (search?: string) => {
    const params = search ? { search } : {};
    const response = await api.get<{ success: boolean; data: Experience[] }>('/experiences', { params });
    return response.data.data;
  },

  getById: async (id: string) => {
    const response = await api.get<{ success: boolean; data: { experience: Experience; slots: Slot[] } }>(`/experiences/${id}`);
    return response.data.data;
  },
};

export const bookingAPI = {
  create: async (booking: Booking) => {
    const response = await api.post<BookingResponse>('/bookings', booking);
    return response.data;
  },
};

export const promoAPI = {
  validate: async (code: string) => {
    const response = await api.post<{ success: boolean; data: PromoCode }>('/promo/validate', { code });
    return response.data;
  },
};

export default api;