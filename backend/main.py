from fastapi import FastAPI
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

app = FastAPI(title='Cloud Travel Agency API')

app.include_router(bookings_router)
app.include_router(invoices_router)
app.include_router(notifications_router)
app.include_router(rates_router)
app.include_router(payments_router)
app.include_router(maintenance_router)
app.include_router(hotels_router, prefix="/hotels", tags=["hotels"])

@app.on_event('startup')
async def startup_event():
    print('Starting app...')
    # Start scheduler
    start_scheduler()

@app.get('/')
async def root():
    return {'ok': True, 'message': 'Cloud Travel Agency API'}
