from fastapi import APIRouter, HTTPException, Query, status
from typing import List, Optional
from datetime import date

from ..supabase_client import supabase
from ..schemas import Rate, RateCreate
import os

router = APIRouter(
    tags=["Rates"],
)

@router.post("/", response_model=Rate, status_code=status.HTTP_201_CREATED)
async def create_rate(rate: RateCreate):
    data = rate.model_dump()
    data['valid_from'] = data['valid_from'].isoformat()
    data['valid_to'] = data['valid_to'].isoformat()
    
    res = supabase.table("rates").insert(data).execute()
    
    if not res.data:
        raise HTTPException(status_code=500, detail="Failed to create rate")
        
    return res.data[0]

@router.put("/{rate_id}", response_model=Rate)
async def update_rate(rate_id: str, rate: RateCreate):
    data = rate.model_dump()
    data['valid_from'] = data['valid_from'].isoformat()
    data['valid_to'] = data['valid_to'].isoformat()
    
    res = supabase.table("rates").update(data).eq("id", rate_id).execute()
    
    if not res.data:
        raise HTTPException(status_code=404, detail="Rate not found or update failed")
        
    return res.data[0]

@router.get("/", response_model=List[Rate])
async def list_rates(
    valid_on: Optional[date] = None,
    room_type: Optional[str] = None
):
    query = supabase.table("rates").select("*")
    
    if valid_on:
        query = query.lte("valid_from", valid_on.isoformat())\
                     .gte("valid_to", valid_on.isoformat())
                     
    if room_type:
        query = query.eq("room_type", room_type)
        
    res = query.execute()
    
    if hasattr(res, "error") and res.error:
        raise HTTPException(status_code=500, detail=res.error.message)
        
    return res.data

@router.delete("/{rate_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_rate(rate_id: str):
    res = supabase.table("rates").delete().eq("id", rate_id).execute()
    
    if not res.data:
        # Check if it was actually deleted or just not found
        # Usually res.data is empty for delete if successful in some client versions, 
        # but let's be safe and just return if no error.
        pass
    
    return None
