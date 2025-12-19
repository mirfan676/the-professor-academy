import os
from fastapi import Request, HTTPException

ALLOWED_ORIGINS = [
    o.strip() for o in os.getenv("ALLOWED_ORIGINS", "").split(",") if o.strip()
]

def verify_request_origin(request: Request):
    origin = request.headers.get("origin")
    referer = request.headers.get("referer")

    # Allow server-to-server (no origin header)
    if not origin and not referer:
        return

    def is_allowed(value: str | None):
        if not value:
            return False
        return any(domain in value for domain in ALLOWED_ORIGINS)

    if is_allowed(origin) or is_allowed(referer):
        return

    raise HTTPException(
        status_code=403,
        detail="Access denied: unauthorized origin"
    )
