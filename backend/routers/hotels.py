from fastapi import APIRouter, HTTPException
from typing import List, Optional
from supabase import create_client, Client
from dotenv import load_dotenv
import os
from ..schemas import Hotel, HotelCreate

load_dotenv()

router = APIRouter()

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

@router.get("/", response_model=List[Hotel])
def get_hotels():
    if os.environ.get("DEV_NO_SUPABASE"):
        return [
            {
                "id": "1", "name": "Fasmala Resort", "type": "Resort", 
                "contact_email": "res@fasmala.com", "phone": "+960 7498616",
                "created_at": "2024-01-01"
            },
            {
                "id": "2", "name": "Angsana Velavaru", "type": "Resort",
                "contact_email": "reservations@angsana.com", "phone": "+960 6760011",
                "created_at": "2024-01-01"
            }
        ]
    response = supabase.table("hotels").select("*").execute()
    return response.data

@router.post("/", response_model=Hotel)
def create_hotel(hotel: HotelCreate):
    if os.environ.get("DEV_NO_SUPABASE"):
        return {**hotel.dict(), "id": "new-id", "created_at": "now"}
    response = supabase.table("hotels").insert(hotel.dict(exclude_unset=True)).execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Create hotel failed")
    return response.data[0]

@router.put("/{hotel_id}", response_model=Hotel)
def update_hotel(hotel_id: str, hotel: HotelCreate):
    response = supabase.table("hotels").update(hotel.dict(exclude_unset=True)).eq("id", hotel_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Hotel not found")
    return response.data[0]

@router.delete("/{hotel_id}")
def delete_hotel(hotel_id: str):
    supabase.table("hotels").delete().eq("id", hotel_id).execute()
    return {"message": "Hotel deleted"}
