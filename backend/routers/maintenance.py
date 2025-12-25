from fastapi import APIRouter
from ..tasks import check_arrivals_and_notify

router = APIRouter(tags=["maintenance"])

@router.post('/check_arrivals')
def trigger_check_arrivals():
    # run the check job once
    check_arrivals_and_notify()
    return {'ok': True, 'message': 'Check started'}
