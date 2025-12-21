import os
from fastapi import Request, HTTPException
from dotenv import load_dotenv

# Load .env variables
load_dotenv()

# Parse allowed origins from .env
ALLOWED_ORIGINS = [
    o.strip() for o in os.getenv("ALLOWED_ORIGINS", "").split(",") if o.strip()
]

def verify_request_origin(request: Request):
    origin = request.headers.get("origin")
    referer = request.headers.get("referer")

    # Allow server-to-server requests (no origin or referer)
    if not origin and not referer:
        return

    def is_allowed(value: str | None) -> bool:
        if not value:
            return False
        # Exact match or domain included in value
        return any(value.startswith(domain) or domain in value for domain in ALLOWED_ORIGINS)

    # Debugging: log incoming origins
    print(f"Incoming request - origin: {origin}, referer: {referer}")

    if is_allowed(origin) or is_allowed(referer):
        return

    raise HTTPException(
        status_code=403,
        detail=f"Access denied: unauthorized origin. Origin={origin}, Referer={referer}"
    )
