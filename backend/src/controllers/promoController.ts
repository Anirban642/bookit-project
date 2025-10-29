import { Request, Response } from 'express';
import PromoCode from '../models/PromoCode';

export const validatePromoCode = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ success: false, message: 'Promo code required' });
    }

    const promo = await PromoCode.findOne({ code: code.toUpperCase(), active: true });

    if (!promo) {
      return res.status(404).json({ success: false, message: 'Invalid promo code' });
    }

    res.json({ 
      success: true, 
      data: {
        code: promo.code,
        discountType: promo.discountType,
        discountValue: promo.discountValue
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};