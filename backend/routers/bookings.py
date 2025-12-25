from fastapi import APIRouter, HTTPException, Query, status, Depends
from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List, Literal
from datetime import date
import uuid

from ..supabase_client import supabase
from ..schemas import BookingCreate  # Assuming your existing BookingCreate schema

router = APIRouter(
    prefix="/bookings",
    tags=["Bookings"],
)

# Common literals for type safety and better OpenAPI docs
RoomType = Literal["STD", "DLX", "SUT", "KING", "TWN", "QFAM", "OCEAN", "POOL", "VILLA"]
RateType = Literal["Rack", "Corporate", "Package", "Group", "AAA", "Government", "Promotional"]
Source = Literal["Direct", "Website", "Booking.com", "Expedia", "Travel Agent", "Walk-in", "OTA"]

# Response models
class BookingResponse(BookingCreate):
    id: str
    created_at: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class PaginatedBookingsResponse(BaseModel):
    data: List[BookingResponse]
    total: int
    page: int
    size: int
    pages: int


@router.post(
    "/",
    response_model=BookingResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new booking"
)
async def create_booking(payload: BookingCreate):
    data = payload.model_dump(exclude_unset=True)

    # Optional: auto-calculate nights
    if data.get("arrival_date") and data.get("departure_date") and data.get("nights", 0) <= 0:
        data["nights"] = (data["departure_date"] - data["arrival_date"]).days

    # Ensure dates are strings for Supabase
    if data.get("arrival_date"): data["arrival_date"] = data["arrival_date"].isoformat()
    if data.get("departure_date"): data["departure_date"] = data["departure_date"].isoformat()

    res = supabase.table("bookings").insert(data).execute()

    if not res.data:
        raise HTTPException(status_code=500, detail="Failed to create booking")

    return res.data[0]

@router.put("/{booking_id}", response_model=BookingResponse)
async def update_booking(booking_id: str, payload: BookingCreate):
    data = payload.model_dump(exclude_unset=True)
    
    if data.get("arrival_date"): data["arrival_date"] = data["arrival_date"].isoformat()
    if data.get("departure_date"): data["departure_date"] = data["departure_date"].isoformat()

    res = supabase.table("bookings").update(data).eq("id", booking_id).execute()

    if not res.data:
        raise HTTPException(status_code=404, detail="Booking not found or update failed")

    return res.data[0]

@router.delete("/{booking_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_booking(booking_id: str):
    res = supabase.table("bookings").delete().eq("id", booking_id).execute()
    return None


@router.get(
    "/",
    response_model=PaginatedBookingsResponse,
    summary="List bookings with pagination, filtering and sorting"
)
async def list_bookings(
    page: int = Query(1, ge=1, description="Page number"),
    size: int = Query(20, ge=1, le=100, description="Items per page"),
    sort_by: str = Query("arrival", description="Field to sort by"),
    sort_order: Literal["asc", "desc"] = Query("desc", description="Sort order"),
    property: Optional[str] = Query(None, description="Filter by property_booked"),
    arrival_from: Optional[date] = Query(None, description="Filter arrival >= date"),
    arrival_to: Optional[date] = Query(None, description="Filter arrival <= date"),
    confirmation_no: Optional[str] = Query(None, description="Filter by confirmation number"),
    name: Optional[str] = Query(None, description="Filter by guest name (ilike)"),
):
    offset = (page - 1) * size

    query = supabase.table("bookings").select("*", count="exact")

    # Basic filters
    if property:
        query = query.eq("property_booked", property)
    if confirmation_no:
        query = query.eq("confirmation_no", confirmation_no)
    if name:
        query = query.ilike("name", f"%{name}%")
    if arrival_from:
        query = query.gte("arrival", arrival_from.isoformat())
    if arrival_to:
        query = query.lte("arrival", arrival_to.isoformat())

    # Sorting
    order_direction = sort_order == "desc"
    query = query.order(sort_by, desc=order_direction)

    # Pagination
    res = query.range(offset, offset + size - 1).execute()

    if hasattr(res, "error") and res.error:
        raise HTTPException(status_code=500, detail=str(res.error))

    total = res.count or 0
    pages = (total + size - 1) // size if total else 0

    return {
        "data": res.data,
        "total": total,
        "page": page,
        "size": size,
        "pages": pages,
    }


@router.get(
    "/{confirmation_no}",
    response_model=BookingResponse,
    summary="Get booking by confirmation number"
)
async def get_booking(confirmation_no: str):
    res = supabase.table("bookings").select("*").eq("confirmation_no", confirmation_no).single().execute()

    if hasattr(res, "error") and res.error:
        if "not found" in str(res.error).lower():
            raise HTTPException(status_code=404, detail="Booking not found")
        raise HTTPException(status_code=500, detail=str(res.error))

    if not res.data:
        raise HTTPException(status_code=404, detail="Booking not found")

    return res.data