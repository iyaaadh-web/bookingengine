from fastapi import APIRouter, HTTPException, status
from typing import List

from ..supabase_client import supabase
from ..schemas import Payment, PaymentCreate
import os

router = APIRouter(
    tags=["Payments"],
)

@router.post("/", response_model=Payment, status_code=status.HTTP_201_CREATED)
async def record_payment(payment: PaymentCreate):
    data = payment.model_dump()
    data['payment_date'] = data['payment_date'].isoformat()
    
    res = supabase.table("payments").insert(data).execute()
    
    if hasattr(res, "error") and res.error:
        raise HTTPException(status_code=500, detail=res.error.message)
        
    return res.data[0]

@router.get("/invoice/{invoice_id}", response_model=List[Payment])
async def get_payments_for_invoice(invoice_id: str):
    res = supabase.table("payments").select("*").eq("invoice_id", invoice_id).execute()
    
    if hasattr(res, "error") and res.error:
        raise HTTPException(status_code=500, detail=res.error.message)
        
    return res.data
