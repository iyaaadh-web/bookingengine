from fastapi import APIRouter, HTTPException, Query, status
from pydantic import BaseModel, ConfigDict
from typing import Optional, List, Literal
from datetime import datetime

from ..supabase_client import supabase

router = APIRouter(
    tags=["Notifications"],
)

# Notification types for better structure and future extensibility
NotificationType = Literal[
    "arrival_today",
    "arrival_tomorrow",
    "checkin_reminder",
    "payment_due",
    "invoice_ready",
    "booking_confirmation",
    "custom",
]

class NotificationResponse(BaseModel):
    id: str
    type: Optional[NotificationType] = None
    title: Optional[str] = None
    message: str
    booking_id: Optional[str] = None
    confirmation_no: Optional[str] = None
    guest_name: Optional[str] = None
    channel: Optional[Literal["email", "sms", "whatsapp", "push"]] = None
    sent: bool = False
    sent_at: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


class PaginatedNotificationsResponse(BaseModel):
    data: List[NotificationResponse]
    total: int
    page: int
    size: int
    pages: int


@router.get(
    "/",
    response_model=PaginatedNotificationsResponse,
    summary="List notifications",
    description="Retrieve a paginated list of notifications with optional filtering and sorting."
)
async def list_notifications(
    page: int = Query(1, ge=1, description="Page number"),
    size: int = Query(20, ge=1, le=100, description="Items per page"),
    sent: Optional[bool] = Query(None, description="Filter by sent status"),
    channel: Optional[Literal["email", "sms", "whatsapp", "push"]] = Query(None, description="Filter by delivery channel"),
    confirmation_no: Optional[str] = Query(None, description="Filter by linked booking confirmation number"),
    sort_by: str = Query("created_at", description="Field to sort by"),
    sort_order: Literal["asc", "desc"] = Query("desc", description="Sort order"),
):
    offset = (page - 1) * size

    query = supabase.table("notifications").select("*", count="exact")

    # Filters
    if sent is not None:
        query = query.eq("sent", sent)
    if channel:
        query = query.eq("channel", channel)
    if confirmation_no:
        query = query.eq("confirmation_no", confirmation_no)

    # Sorting
    query = query.order(sort_by, desc=(sort_order == "desc"))

    # Pagination
    res = query.range(offset, offset + size - 1).execute()

    if res.error:
        raise HTTPException(status_code=500, detail=f"Database error: {res.error.message}")

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
    "/{notification_id}",
    response_model=NotificationResponse,
    summary="Get a single notification"
)
async def get_notification(notification_id: str):
    res = supabase.table("notifications").select("*").eq("id", notification_id).single().execute()

    if res.error:
        raise HTTPException(status_code=500, detail=f"Database error: {res.error.message}")
    if not res.data:
        raise HTTPException(status_code=404, detail="Notification not found")

    return res.data


@router.post(
    "/{notification_id}/send",
    response_model=NotificationResponse,
    status_code=status.HTTP_200_OK,
    summary="Mark notification as sent",
    description="""
    Updates the notification status to sent and records the timestamp.
    Use this endpoint after successfully delivering a notification via email, SMS, etc.
    """
)
async def mark_notification_sent(notification_id: str):
    update_res = (
        supabase.table("notifications")
        .update({"sent": True, "sent_at": datetime.utcnow().isoformat()})
        .eq("id", notification_id)
        .execute()
    )

    if update_res.error:
        raise HTTPException(status_code=500, detail=f"Failed to update notification: {update_res.error.message}")

    # Fetch and return the updated record
    fetch_res = supabase.table("notifications").select("*").eq("id", notification_id).single().execute()

    if fetch_res.error:
        raise HTTPException(status_code=500, detail=f"Database error: {fetch_res.error.message}")
    if not fetch_res.data:
        raise HTTPException(status_code=404, detail="Notification not found after update")

    return fetch_res.data
