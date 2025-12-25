# Fasmala Travels - Luxury Booking Engine

A professional Property Management System (PMS) and Booking Engine for Fasmala Travels.

## Key Features
- **Dynamic Reservation System**: PMS-style interface with real-time room rate calculation.
- **Seasonal Rate Management**: Granular control over room rates by season, room type, and occupancy.
- **Tax Invoice Engine**: Automatic generation of Maldivian tax invoices (GST, Green Tax) with professional PDF-ready print templates.
- **Executive Dashboard**: Real-time business intelligence with arrival tracking, revenue summary, and operational stats.
- **Backend API**: Robust FastAPI implementation with Supabase integration.
- **Automated Notifications**: Built-in scheduler for guest arrival alerts.

## Tech Stack
- **Frontend**: React 18, Vite, Lucide Icons.
- **Backend**: FastAPI, Pydantic, Supabase (PostgreSQL), APScheduler.

## Getting Started
1. **Setup Backend**:
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```
2. **Setup Frontend**:
   ```bash
   npm install
   npm run dev
   ```

## Design System
The application uses a "Classic PMS" aesthetic combined with modern design tokens defined in `src/styles.css`, featuring high-contrast typography, glassmorphism elements, and professional data density.

## Deployment

### Frontend (Vercel)
This project is pre-configured for Vercel. 
1. Push this repository to GitHub.
2. Connect your repository to Vercel.
3. The `vercel.json` ensures SPA routing works correctly.

### Backend
> [!IMPORTANT]
> The backend contains a persistent background scheduler (`APScheduler`) for arrival notifications. For this reason, it is recommended to host the backend on a persistent server (e.g., **Railway**, **Render**, **DigitalOcean**, or **AWS**) rather than Vercel Serverless Functions, which do not support long-running background tasks.

1. Deploy the `backend/` folder to your chosen provider.
2. Set your environment variables (Supabase URL, Key).
3. Update `VITE_API_URL` in your Vercel frontend settings to point to your deployed backend.

## Project Structure
- `/` (Root): Frontend React + Vite application (optimized for Vercel).
- `/backend`: FastAPI Python application with Supabase integration.
- `backend/supabase_schema.sql`: Database schema and table definitions.
