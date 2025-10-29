# BookIt - Experience Booking Platform

A full-stack web application for booking travel experiences with slot management, promo codes, and real-time availability.

## 🚀 Features

- Browse and search experiences
- Real-time slot availability
- Date and time selection
- Promo code validation (SAVE10, FLAT100)
- Responsive design
- Complete booking flow

## 🛠️ Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite
- TailwindCSS
- React Router
- Axios
- Lucide Icons

**Backend:**
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- CORS enabled

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your MongoDB URI
npm run seed
npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

## 🌐 API Endpoints

- `GET /api/experiences` - Get all experiences
- `GET /api/experiences/:id` - Get experience details
- `POST /api/bookings` - Create booking
- `POST /api/promo/validate` - Validate promo code

## 🎨 Design

Built from Figma design specifications with:
- Responsive layouts (mobile, tablet, desktop)
- Modern UI with TailwindCSS
- Smooth transitions and hover effects

## 🧪 Testing

**Test Promo Codes:**
- `SAVE10` - 10% discount
- `FLAT100` - ₹100 flat discount

## 📱 Deployment

### Backend (Render)
1. Push code to GitHub
2. Connect to Render
3. Add environment variables
4. Deploy

### Frontend (Vercel)
1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy

## 📄 License

MIT

## 👨‍💻 Author

Built as an internship assignment project