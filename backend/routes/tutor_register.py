from fastapi import APIRouter, Form, File, UploadFile, HTTPException, Depends, Request
from datetime import datetime
import uuid
import traceback

from config.security import verify_request_origin
from config.recaptcha import verify_recaptcha
from config.imgbb import upload_to_imgbb
from config.geocoder import geolocator
import config.sheets as sheets
from config.sheets import is_id_registered

router = APIRouter(
    dependencies=[Depends(verify_request_origin)]
)

@router.post("/tutors/register")
async def register_tutor(
    request: Request,  # <-- Added to inspect raw form data
    # --- Security ---
    recaptcha_token: str = Form(...),
    
    # --- Basic Info ---
    name: str = Form(...),
    id_card: str = Form(...),
    qualification: str = Form(...),
    subject: str = Form(""),
    major_subjects: str = Form(""),
    experience: int = Form(...),
    phone: str = Form(...),
    bio: str = Form(...),

    # --- Location ---
    lat: str = Form(None),
    lng: str = Form(None),

    # --- Media ---
    image: UploadFile = File(None),
):
    try:
        # ---------- DEBUG: Print all incoming form keys ----------
        form_data = await request.form()
        print("Form keys received:", list(form_data.keys()))
        # ---------------------------------------------------------

        # ------------------------------------
        # 1️⃣ Verify reCAPTCHA Enterprise
        # ------------------------------------
        verify_recaptcha(recaptcha_token, "tutor_register", request)

        # ------------------------------------
        # 2️⃣ Duplicate ID Check
        # ------------------------------------
        if is_id_registered(id_card):
            raise HTTPException(status_code=400, detail="⚠️ This ID card is already registered.")

        # ------------------------------------
        # 3️⃣ Generate IDs & timestamps
        # ------------------------------------
        date_added = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
        profile_id = f"TUTOR-{uuid.uuid4().hex[:8].upper()}"
        profile_url = f"https://theprofessoracademy.com/tutor/{profile_id}"

        # ------------------------------------
        # 4️⃣ Upload image
        # ------------------------------------
        image_url = await upload_to_imgbb(image)

        # ------------------------------------
        # 5️⃣ Resolve location (if available)
        # ------------------------------------
        latitude = float(lat) if lat else ""
        longitude = float(lng) if lng else ""

        city = district = province = tehsil = ""
        if latitude and longitude:
            try:
                loc = geolocator.reverse(f"{latitude}, {longitude}", timeout=10)
                addr = loc.raw.get("address", {})
                city = addr.get("city") or addr.get("town") or ""
                district = addr.get("county") or ""
                province = addr.get("state") or ""
                tehsil = addr.get("suburb") or ""
            except Exception:
                pass

        # ------------------------------------
        # 6️⃣ Prepare subjects
        # ------------------------------------
        primary_subject = subject or ""
        qualification_full = f"{qualification} {primary_subject}" if primary_subject else qualification

        # Deduplicate major subjects and remove primary subject if included
        major_list = [s.strip() for s in (major_subjects or "").split(",") if s.strip()]
        major_filtered = sorted(set(s for s in major_list if s != primary_subject))
        major_subjects_cleaned = ",".join(major_filtered)

        # ---------- DEBUG LOGS ----------
        print("Incoming primary subject:", primary_subject)
        print("Incoming major subjects:", major_subjects)
        print("Processed major subjects (cleaned):", major_subjects_cleaned)
        # -------------------------------

        # ------------------------------------
        # 7️⃣ Append row to Google Sheet
        # ⚠️ MUST MATCH COLUMN ORDER EXACTLY
        # ------------------------------------
        sheets.sheet.append_row([
            date_added,              # Date Added
            profile_id,              # Profile ID
            profile_url,             # Profile URL
            name,                    # Full Name
            id_card,                 # ID Card Number
            qualification_full,      # Qualification (degree + primary)
            primary_subject,         # Primary Subject (just main subject)
            major_subjects_cleaned,  # Major Subjects (no duplicates, exclude primary)
            str(experience),         # Experience
            phone,                   # Phone
            bio,                     # Bio
            province,                # Province
            district,                # District
            tehsil,                  # Tehsil
            city,                    # City
            str(latitude),           # Latitude
            str(longitude),          # Longitude
            image_url,               # Image URL
            "No",                    # Verified
        ])

        # ------------------------------------
        # 8️⃣ Response
        # ------------------------------------
        return {
            "message": "✅ Tutor registered successfully",
            "profile_id": profile_id,
            "profile_url": profile_url,
        }

    except HTTPException:
        raise
    except Exception:
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail="❌ Failed to register tutor"
        )
