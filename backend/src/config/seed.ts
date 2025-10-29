import mongoose from 'mongoose';
import Experience from '../models/Experience';
import Slot from '../models/Slot';
import PromoCode from '../models/PromoCode';
import connectDB from './database';

const seedData = async () => {
  await connectDB();

  await Experience.deleteMany({});
  await Slot.deleteMany({});
  await PromoCode.deleteMany({});

  const experiences = await Experience.insertMany([
    {
      title: 'Kayaking',
      location: 'Udupi',
      imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
      description: 'Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking.',
      price: 999,
      category: 'Adventure'
    },
    {
      title: 'Kayaking',
      location: 'Udupi, Karnataka',
      imageUrl: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=80',
      description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
      price: 999,
      category: 'Adventure'
    },
    {
      title: 'Kayaking',
      location: 'Udupi, Karnataka',
      imageUrl: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&q=80',
      description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
      price: 999,
      category: 'Adventure'
    },
    {
      title: 'Nandi Hills Sunrise',
      location: 'Bangalore',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      description: 'Curated small-group experience. Certified guide. Early morning included.',
      price: 899,
      category: 'Nature'
    },
    {
      title: 'Coffee Trail',
      location: 'Coorg',
      imageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80',
      description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
      price: 1299,
      category: 'Nature'
    },
    {
      title: 'Boat Cruise',
      location: 'Sunderbans',
      imageUrl: 'https://images.unsplash.com/photo-1608889476561-6242cfdbf622?w=800&q=80',
      description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
      price: 999,
      category: 'Adventure'
    },
    {
      title: 'Bungee Jumping',
      location: 'Manali',
      imageUrl: 'https://images.pexels.com/photos/3077882/pexels-photo-3077882.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
      price: 999,
      category: 'Adventure'
    },
    {
      title: 'Coffee Trail',
      location: 'Coorg',
      imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80',
      description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
      price: 1299,
      category: 'Nature'
    }
  ]);

  const slots = [];
  for (const exp of experiences) {
    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      
      slots.push({
        experienceId: exp._id,
        slotDate: date,
        slotTime: '07:00',
        availableSpots: 4,
        totalSpots: 10
      });
      
      slots.push({
        experienceId: exp._id,
        slotDate: date,
        slotTime: '09:00',
        availableSpots: 2,
        totalSpots: 10
      });
      
      slots.push({
        experienceId: exp._id,
        slotDate: date,
        slotTime: '11:00',
        availableSpots: 5,
        totalSpots: 10
      });
      
      slots.push({
        experienceId: exp._id,
        slotDate: date,
        slotTime: '13:00',
        availableSpots: 0,
        totalSpots: 10
      });
    }
  }

  await Slot.insertMany(slots);

  await PromoCode.insertMany([
    { code: 'SAVE10', discountType: 'percentage', discountValue: 10, active: true },
    { code: 'FLAT100', discountType: 'flat', discountValue: 100, active: true }
  ]);

  console.log('✅ Data seeded successfully');
  process.exit(0);
};

seedData();