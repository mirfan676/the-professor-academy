import os
import re
from fastapi import Request, HTTPException
from dotenv import load_dotenv

load_dotenv()

# Allowed Domains (also keep in .env)
ALLOWED_ORIGINS = [
    o.strip().rstrip("/") for o in os.getenv("ALLOWED_ORIGINS", "").split(",") if o.strip()
]

# Strict Domain Validation
allowed_regex = re.compile(
    r"^https?://(localhost(:\d+)?|127\.0\.0\.1(:\d+)?|(\w+\.)*theprofessoracademy\.com)(/|$)",
    re.IGNORECASE
)


def verify_request_origin(request: Request):
    origin = request.headers.get("origin", "")
    referer = request.headers.get("referer", "")

    # Allow internal server calls
    if not origin and not referer:
        return

    print(f"Incoming request - origin={origin}, referer={referer}")

    def allowed(v: str) -> bool:
        return bool(v and allowed_regex.match(v))

    if allowed(origin) or allowed(referer):
        return

    raise HTTPException(
        status_code=403,
        detail=f"Access denied: unauthorized origin. Origin={origin}, Referer={referer}"
    )
