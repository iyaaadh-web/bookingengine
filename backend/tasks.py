from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta, date
from .supabase_client import supabase


def check_arrivals_and_notify():
    tomorrow = date.today() + timedelta(days=1)
    print(f"[scheduler] checking arrivals for {tomorrow}")
    res = supabase.table('bookings').select('*').eq('arrival_date', tomorrow.isoformat()).execute()
    if res.error:
        print('[scheduler] supabase error:', res.error)
        return
    bookings = res.data
    for b in bookings:
        # Create a notification record in supabase
        payload = {'booking_id': b['id'], 'type': 'one_day_arrival', 'payload': {'booking': b}, 'sent': False}
        r = supabase.table('notifications').insert(payload).execute()
        if r.error:
            print('[scheduler] failed to create notification', r.error)
        else:
            print('[scheduler] notification created for booking', b['id'])


_scheduler = None

def start_scheduler():
    global _scheduler
    if _scheduler:
        return
    _scheduler = BackgroundScheduler()
    # Run every day at 07:00 UTC (adjust as needed)
    _scheduler.add_job(check_arrivals_and_notify, 'interval', hours=24, next_run_time=datetime.utcnow())
    _scheduler.start()
    print('[scheduler] started')
