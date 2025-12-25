# Fasmala Travel Management System

## Setup Instructions

### Frontend Setup
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The frontend will be available at: `http://localhost:5173`

### Backend Setup
```bash
# Navigate to backend
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Run the API server
uvicorn main:app --reload --port 8000
```

The API will be available at: `http://localhost:8000`

## Staff Portal Access

**Login Credentials:**
- Email: `admin@fasmala.com`
- Password: `admin12345`

## Features

### Public Website
- Elegant homepage with resort showcase
- Resort collection gallery
- About page
- Contact form

### Staff Management Portal
- **Dashboard** - Overview and statistics
- **Resorts** - Manage resort properties
- **Reservations** - Handle guest bookings
- **Pricing** - Set and manage rates
- **Billing** - Generate and track invoices
- **Expenses** - Track operational costs
- **Analytics** - View reports and insights
- **History** - Access past transactions

## Technology Stack

### Frontend
- React 18 with Vite
- React Router for navigation
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide React for icons
- Supabase for authentication

### Backend
- FastAPI (Python)
- Supabase (PostgreSQL)
- APScheduler for background tasks
- Pydantic for data validation

## Environment Variables

### Frontend (`.env`)
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:8000
```

### Backend (`backend/.env`)
```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_key
DEV_NO_SUPABASE=true  # For development without Supabase
```

## Deployment

The application is configured for deployment on Vercel (frontend) and can use any Python hosting service for the backend (e.g., Railway, Render, Heroku).
