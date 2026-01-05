import os
from datetime import datetime, timedelta
from jose import jwt, JWTError
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()

ADMIN_USERNAME = os.getenv("ADMIN_USERNAME")
SECRET_KEY = os.getenv("ADMIN_SECRET_KEY")
ALGORITHM = "HS256"


def create_token():
    payload = {
        "sub": ADMIN_USERNAME,
        "exp": datetime.utcnow() + timedelta(hours=6)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def admin_required(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        if payload.get("sub") != ADMIN_USERNAME:
            raise HTTPException(status_code=401, detail="Unauthorized")

        return payload  # ✅ IMPORTANT

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

