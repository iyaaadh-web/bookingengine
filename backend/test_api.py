"""
Quick test script to verify all API endpoints are working
Run this after starting the backend server with: uvicorn main:app --reload
"""
import requests
import json

BASE_URL = "http://localhost:8000"

def test_endpoint(name, url):
    try:
        response = requests.get(url)
        status = "✅ OK" if response.status_code == 200 else f"❌ {response.status_code}"
        print(f"{status} - {name}: {url}")
        return response.status_code == 200
    except Exception as e:
        print(f"❌ ERROR - {name}: {str(e)}")
        return False

print("=" * 60)
print("Testing Fasmala Travel Management API Endpoints")
print("=" * 60)

# Test root
test_endpoint("Root API", f"{BASE_URL}/")

# Test all management endpoints
endpoints = [
    ("Hotels/Resorts", f"{BASE_URL}/hotels/"),
    ("Bookings/Reservations", f"{BASE_URL}/bookings/"),
    ("Rates/Pricing", f"{BASE_URL}/rates/"),
    ("Invoices/Billing", f"{BASE_URL}/invoices/"),
    ("Payments/Expenses", f"{BASE_URL}/payments/invoice/test"),
    ("Notifications", f"{BASE_URL}/notifications/"),
]

print("\n" + "=" * 60)
print("Testing Management Endpoints")
print("=" * 60)

results = []
for name, url in endpoints:
    results.append(test_endpoint(name, url))

print("\n" + "=" * 60)
success_count = sum(results)
total_count = len(results)
print(f"Results: {success_count}/{total_count} endpoints working")
print("=" * 60)

if success_count == total_count:
    print("\n✅ All endpoints are working correctly!")
else:
    print("\n⚠️  Some endpoints need attention")
    print("Make sure the backend server is running and Supabase is configured")
