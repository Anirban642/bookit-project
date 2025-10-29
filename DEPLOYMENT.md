# Deployment Guide

## Deploy Backend to Render

1. **Push to GitHub**
```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
```

2. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

3. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your repository
   - Select `backend` folder
   - Configure:
     - Name: `bookit-backend`
     - Environment: `Node`
     - Build Command: `npm install && npm run build`
     - Start Command: `npm start`

4. **Add Environment Variables**
   - `MONGODB_URI` - Your MongoDB Atlas URI
   - `NODE_ENV` - `production`
   - `FRONTEND_URL` - (Add after frontend deployed)

5. **Deploy**
   - Click "Create Web Service"
   - Note your backend URL (e.g., `https://bookit-backend.onrender.com`)

## Deploy Frontend to Vercel

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Select your repository
   - Configure:
     - Framework Preset: `Vite`
     - Root Directory: `frontend`

3. **Add Environment Variables**
   - `VITE_API_URL` - Your Render backend URL + `/api`
   - Example: `https://bookit-backend.onrender.com/api`

4. **Deploy**
   - Click "Deploy"
   - Note your frontend URL

5. **Update Backend CORS**
   - Go back to Render
   - Add `FRONTEND_URL` environment variable
   - Value: Your Vercel URL
   - Redeploy backend

## Railway Alternative (Backend)

1. Go to https://railway.app
2. "New Project" → "Deploy from GitHub"
3. Select repository and `backend` folder
4. Add environment variables
5. Deploy

## Post-Deployment

1. Test all features on live site
2. Check API health: `https://your-backend.com/api/health`
3. Verify MongoDB connection
4. Test complete booking flow