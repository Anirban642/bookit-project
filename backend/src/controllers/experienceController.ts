import { Request, Response } from 'express';
import Experience from '../models/Experience';
import Slot from '../models/Slot';

export const getAllExperiences = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const query = search 
      ? { 
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { location: { $regex: search, $options: 'i' } }
          ]
        }
      : {};

    const experiences = await Experience.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: experiences });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getExperienceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const experience = await Experience.findById(id);
    
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }

    const slots = await Slot.find({ experienceId: id }).sort({ slotDate: 1, slotTime: 1 });

    res.json({ success: true, data: { experience, slots } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};