from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime

class HotelCreate(BaseModel):
    name: str
    type: Optional[str] = 'Resort'
    contact_email: Optional[str] = None
    phone: Optional[str] = None
    website: Optional[str] = None
    logo_url: Optional[str] = None

class Hotel(HotelCreate):
    id: str
    created_at: Optional[str] = None
    class Config:
        orm_mode = True

class BookingCreate(BaseModel):
    hotel_id: Optional[str] = None
    user_id: Optional[str] = 'guest'
    # Guest
    first_name: str
    last_name: Optional[str] = ''
    title: Optional[str] = ''
    country: Optional[str] = ''
    phone: Optional[str] = ''
    email: Optional[str] = ''
    vip_status: Optional[str] = ''
    member_no: Optional[str] = ''
    member_level: Optional[str] = ''
    # Stay
    place: str
    arrival_date: date
    nights: int = 1
    departure_date: Optional[date] = None
    adults: int = 1
    children: int = 0
    room_no: Optional[str] = ''
    room_type: Optional[str] = 'STD'
    res_type: Optional[str] = ''
    market_segment: Optional[str] = ''
    source: Optional[str] = ''
    origin: Optional[str] = ''
    # Financial
    rate_code: Optional[str] = ''
    rate_amount: Optional[float] = 0.0
    payment_method: Optional[str] = ''
    credit_card_no: Optional[str] = ''
    card_exp: Optional[str] = ''
    balance: Optional[float] = 0.0
    status: Optional[str] = 'CONFIRMED'

class Booking(BookingCreate):
    id: str
    created_at: Optional[str]

class InvoiceCreate(BaseModel):
    booking_id: str
    amount: float
    currency: Optional[str] = 'USD'

class Invoice(InvoiceCreate):
    id: str
    paid: bool = False
    created_at: Optional[str]

class RateCreate(BaseModel):
    hotel_id: Optional[str] = None
    name: str
    place: Optional[str] = 'Fasmala Resort'
    valid_from: date
    valid_to: date
    room_type: str
    meal_plan: str
    single_rate: float
    double_rate: float
    triple_rate: float
    meal_supplement: Optional[float] = 0.0
    transfer_price: Optional[float] = 0.0

class Rate(RateCreate):
    id: str
    created_at: Optional[str]

class PaymentCreate(BaseModel):
    invoice_id: str
    amount: float
    payment_date: date
    method: str
    reference: Optional[str] = None

class Payment(PaymentCreate):
    id: str
    created_at: Optional[str]
