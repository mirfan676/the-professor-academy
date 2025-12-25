from fastapi import APIRouter, HTTPException, Depends, Query
from fastapi.responses import StreamingResponse
from datetime import datetime
from io import BytesIO
import requests
from PIL import Image
import config.sheets as sheets
from config.security import verify_request_origin

router = APIRouter(
    prefix="/tutors",
    tags=["Tutors"],
    dependencies=[Depends(verify_request_origin)]
)

thumbnail_cache = {}

# ------------------------------
# Cache helper
# ------------------------------
def refresh_cache_if_needed():
    now = datetime.utcnow()
    if not sheets.cached_tutors or (now - sheets.last_fetch_time) >= sheets.CACHE_DURATION:
        try:
            sheets.preload_tutors()
        except Exception as e:
            raise HTTPException(status_code=503, detail="Failed to load tutors")
    if not sheets.cached_tutors:
        raise HTTPException(status_code=503, detail="No verified tutors available")
    return sheets.cached_tutors

# ------------------------------
# DEBUG
# ------------------------------
@router.get("/debug-sheet")
def debug_sheet():
    try:
        rows = sheets.sheet.get_all_records(empty2zero=False, head=1)
        verified = [r for r in rows if str(r.get("Verified", "")).strip().lower().startswith("y")]
        return {"total_rows": len(rows), "verified_count": len(verified), "preview": verified[:5]}
    except Exception as e:
        return {"error": str(e)}

# ------------------------------
# CHECK ID (must be first)
# ------------------------------
@router.get("/check-id")
async def check_id_card(id_card: str = Query(..., min_length=13, max_length=13)):
    try:
        return {"exists": sheets.is_id_registered(id_card)}
    except Exception as e:
        return {"exists": False, "error": str(e)}

# ------------------------------
# THUMBNAIL
# ------------------------------
@router.get("/image/{profile_id}")
def get_teacher_image(profile_id: str):
    tutors = refresh_cache_if_needed()
    tutor = next((t for t in tutors if t.get("Profile ID") == profile_id), None)
    if not tutor:
        raise HTTPException(status_code=404, detail="Teacher not found")

    if profile_id in thumbnail_cache:
        buffer = thumbnail_cache[profile_id]
        buffer.seek(0)
        return StreamingResponse(
            buffer, media_type="image/jpeg", headers={"Cache-Control": "public, max-age=86400"}
        )

    image_url = tutor.get("Image URL")
    if not image_url:
        raise HTTPException(status_code=404, detail="Image not found")

    try:
        r = requests.get(image_url, timeout=10)
        r.raise_for_status()
        img = Image.open(BytesIO(r.content))

        # Convert palette (P) or other non-RGB modes to RGB
        if img.mode != "RGB":
            img = img.convert("RGB")

        img.thumbnail((150, 150))
        buffer = BytesIO()
        img.save(buffer, format="JPEG", quality=55)
        buffer.seek(0)
        thumbnail_cache[profile_id] = buffer
        buffer.seek(0)
        return StreamingResponse(
            buffer, media_type="image/jpeg", headers={"Cache-Control": "public, max-age=86400"}
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image processing failed: {e}")


# ------------------------------
# LIST ALL TUTORS
# ------------------------------
@router.get("/")
def get_tutors():
    tutors = refresh_cache_if_needed()
    result = []
    for t in tutors:
        t_copy = t.copy()
        pid = t_copy.get("Profile ID")
        t_copy["Thumbnail"] = f"/tutors/image/{pid}"
        t_copy.pop("Image URL", None)
        result.append(t_copy)
    return result

# ------------------------------
# SINGLE PROFILE
# ------------------------------
@router.get("/profile/{profile_id}")
def get_teacher(profile_id: str):
    tutors = refresh_cache_if_needed()
    tutor = next((t for t in tutors if t.get("Profile ID") == profile_id), None)
    if not tutor:
        raise HTTPException(status_code=404, detail="Teacher not found")
    t = tutor.copy()
    t["Thumbnail"] = f"/tutors/image/{profile_id}"
    t.pop("Image URL", None)
    return t
