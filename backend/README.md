# Fasmala Travel Management - Backend API

## Quick Start

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Set Environment Variables
Create a `.env` file in the `backend` directory:
```env
SUPABASE_URL=your_supabase_url_here
SUPABASE_KEY=your_supabase_key_here

# For development without Supabase:
DEV_NO_SUPABASE=true
```

### 3. Run the API Server
```bash
# From the backend directory
uvicorn main:app --reload --port 8000

# Or from the root directory
cd backend && uvicorn main:app --reload --port 8000
```

The API will be available at: `http://localhost:8000`
API Documentation: `http://localhost:8000/docs`

## API Endpoints

### Resorts/Hotels
- `GET /hotels/` - List all properties
- `POST /hotels/` - Create new property
- `PUT /hotels/{id}` - Update property
- `DELETE /hotels/{id}` - Delete property

### Reservations/Bookings
- `GET /bookings/` - List all reservations
- `POST /bookings/` - Create new reservation
- `PUT /bookings/{id}` - Update reservation
- `DELETE /bookings/{id}` - Delete reservation

### Pricing/Rates
- `GET /rates/` - List all rates
- `POST /rates/` - Create new rate
- `PUT /rates/{id}` - Update rate
- `DELETE /rates/{id}` - Delete rate

### Billing/Invoices
- `GET /invoices/` - List all invoices
- `POST /invoices/` - Create new invoice
- `PUT /invoices/{id}` - Update invoice
- `DELETE /invoices/{id}` - Delete invoice

### Expenses
- `GET /payments/` - List all expenses
- `POST /payments/` - Create new expense

### Maintenance
- `GET /maintenance/` - List maintenance records

### Notifications
- `GET /notifications/` - List notifications

## Development Mode

When `DEV_NO_SUPABASE=true` is set, the API will return sample data without requiring a Supabase connection. This is perfect for frontend development and testing.
