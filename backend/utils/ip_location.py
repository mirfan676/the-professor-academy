from fastapi import APIRouter, Request
import requests

router = APIRouter(tags=["Utils"])

@router.get("/utils/ip-location")
def ip_location(request: Request):
    try:
        ip = request.client.host
        r = requests.get(f"https://ipapi.co/{ip}/json/", timeout=5)
        return r.json()
    except Exception:
        return {}
