from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import StreamingResponse
from datetime import datetime
from io import BytesIO
import requests
from PIL import Image
import config.sheets as sheets  # live reference to cached globals
from config.security import verify_request_origin

router = APIRouter(
    prefix="/tutors",
    tags=["Tutors"],
    dependencies=[Depends(verify_request_origin)]
)

# ------------------------------
# Thumbnail cache in memory
# ------------------------------
thumbnail_cache = {}

def refresh_cache_if_needed():
    now = datetime.utcnow()
    if not sheets.cached_tutors or (now - sheets.last_fetch_time) >= sheets.CACHE_DURATION:
        print("⏳ Cache expired or empty. Reloading tutors from sheet...")
        try:
            sheets.preload_tutors()
        except Exception as e:
            print(f"⚠️ Preload failed: {e}")
            raise HTTPException(status_code=503, detail=f"Failed to load tutors: {e}")

    if not sheets.cached_tutors:
        print("⚠️ No verified tutors available after preload.")
        raise HTTPException(status_code=503, detail="No verified tutors available after preload.")

    print(f"✅ Using cached tutors. Count: {len(sheets.cached_tutors)}")
    return sheets.cached_tutors

# ------------------------------
# DEBUG ROUTE
# ------------------------------
@router.get("/debug-sheet")
def debug_sheet():
    try:
        rows = sheets.sheet.get_all_records(empty2zero=False, head=1)
        verified_rows = []

        for idx, r in enumerate(rows):
            raw_verified = r.get("Verified", "")
            cleaned = str(raw_verified).strip().lower()
            if cleaned.startswith("y"):
                verified_rows.append({"row_index": idx, "row_data": r})

        return {
            "total_rows": len(rows),
            "rows_preview": rows[:10],
            "verified_count": len(verified_rows),
            "verified_rows_preview": verified_rows[:10]
        }

    except Exception as e:
        return {"error": str(e)}

# ------------------------------
# SECURE THUMBNAIL ROUTE
# ------------------------------
@router.get("/image/{teacher_id}")
def get_teacher_image(teacher_id: int):
    tutors = refresh_cache_if_needed()
    if teacher_id < 0 or teacher_id >= len(tutors):
        raise HTTPException(status_code=404, detail="Teacher not found")

    if teacher_id in thumbnail_cache:
        buffer = thumbnail_cache[teacher_id]
        buffer.seek(0)
        return StreamingResponse(buffer, media_type="image/jpeg",
                                 headers={"Cache-Control": "public, max-age=86400", "Content-Disposition": "inline"})

    image_url = tutors[teacher_id].get("Image URL")
    if not image_url:
        raise HTTPException(status_code=404, detail="Image not found")

    try:
        r = requests.get(image_url, timeout=10)
        r.raise_for_status()
        img = Image.open(BytesIO(r.content))
        img.thumbnail((150, 150))
        buffer = BytesIO()
        img.save(buffer, format="JPEG", quality=55)
        buffer.seek(0)
        thumbnail_cache[teacher_id] = buffer
        buffer.seek(0)
        return StreamingResponse(buffer, media_type="image/jpeg",
                                 headers={"Cache-Control": "public, max-age=86400", "Content-Disposition": "inline"})
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process image: {e}")

# ------------------------------
# NORMAL ROUTES — IMAGE PROTECTED
# ------------------------------
@router.get("/")
def get_tutors():
    tutors = refresh_cache_if_needed()
    protected_list = []
    for idx, t in enumerate(tutors):
        t_copy = t.copy()
        # Use relative URL
        t_copy["Thumbnail"] = f"/tutors/image/{idx}"
        t_copy.pop("Image URL", None)
        protected_list.append(t_copy)
    return protected_list

@router.get("/{teacher_id}")
def get_teacher(teacher_id: int):
    tutors = refresh_cache_if_needed()
    if teacher_id < 0 or teacher_id >= len(tutors):
        raise HTTPException(status_code=404, detail="Teacher not found")

    t = tutors[teacher_id].copy()
    # Use relative URL
    t["Thumbnail"] = f"/tutors/image/{teacher_id}"
    t.pop("Image URL", None)
    return t
