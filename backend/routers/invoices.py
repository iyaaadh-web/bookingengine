from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import List, Optional
from ..supabase_client import supabase
from ..schemas import Invoice, InvoiceCreate
import os

router = APIRouter(
    tags=["Invoices"],
)

@router.get("/", response_model=dict)
async def list_invoices():
    # Join with bookings to get guest names
    res = supabase.table("invoices").select("*, booking:bookings(*)").execute()
    
    if not res.data and hasattr(res, 'error') and res.error:
        raise HTTPException(status_code=500, detail="Failed to fetch invoices")
        
    return {"data": res.data}

@router.post("/", response_model=Invoice)
async def create_invoice(payload: InvoiceCreate):
    data = payload.model_dump()
    
    # Auto-generate invoice number
    import uuid
    data["invoice_no"] = f"INV-{str(uuid.uuid4())[:6].upper()}"
    
    res = supabase.table("invoices").insert(data).execute()
    
    if not res.data:
        raise HTTPException(status_code=500, detail="Failed to create invoice")
        
    return res.data[0]

@router.put("/{invoice_id}/paid", response_model=Invoice)
async def mark_invoice_as_paid(invoice_id: str):
    res = supabase.table("invoices").update({"paid": True}).eq("id", invoice_id).execute()
    
    if not res.data:
        raise HTTPException(status_code=404, detail="Invoice not found")
        
    return res.data[0]

@router.delete("/{invoice_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_invoice(invoice_id: str):
    supabase.table("invoices").delete().eq("id", invoice_id).execute()
    return None
