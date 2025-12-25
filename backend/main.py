from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

from routers.bookings import router as bookings_router
from routers.invoices import router as invoices_router
from routers.notifications import router as notifications_router
from routers.rates import router as rates_router
from routers.payments import router as payments_router
from routers.maintenance import router as maintenance_router
from routers.hotels import router as hotels_router
from tasks import start_scheduler

app = FastAPI(title='Fasmala Travel Management API')

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers with proper prefixes
app.include_router(bookings_router, prefix="/bookings", tags=["bookings"])
app.include_router(invoices_router, prefix="/invoices", tags=["invoices"])
app.include_router(notifications_router, prefix="/notifications", tags=["notifications"])
app.include_router(rates_router, prefix="/rates", tags=["rates"])
app.include_router(payments_router, prefix="/payments", tags=["payments"])
app.include_router(maintenance_router, prefix="/maintenance", tags=["maintenance"])
app.include_router(hotels_router, prefix="/hotels", tags=["hotels"])

@app.on_event('startup')
async def startup_event():
    print('🚀 Fasmala Travel Management API starting...')
    # Start scheduler
    start_scheduler()
    print('✅ API ready at http://localhost:8000')

@app.get('/')
async def root():
    return {'ok': True, 'message': 'Fasmala Travel Management API', 'version': '1.0'}
