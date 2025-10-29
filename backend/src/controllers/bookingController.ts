import { Request, Response } from 'express';
import Booking from '../models/Booking';
import Slot from '../models/Slot';

const generateReferenceId = () => {
  return 'REF' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { experienceId, slotId, fullName, email, quantity, subtotal, taxes, total, promoCode } = req.body;

    if (!experienceId || !slotId || !fullName || !email || !quantity) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const slot = await Slot.findById(slotId);
    if (!slot) {
      return res.status(404).json({ success: false, message: 'Slot not found' });
    }

    if (slot.availableSpots < quantity) {
      return res.status(400).json({ success: false, message: 'Not enough spots available' });
    }

    slot.availableSpots -= quantity;
    await slot.save();

    const booking = await Booking.create({
      experienceId,
      slotId,
      fullName,
      email,
      quantity,
      subtotal,
      taxes,
      total,
      promoCode,
      referenceId: generateReferenceId()
    });

    res.status(201).json({ 
      success: true, 
      message: 'Booking confirmed',
      data: booking 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};