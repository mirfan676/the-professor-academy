from fastapi import APIRouter, Form, File, UploadFile, HTTPException, Depends
from config.security import verify_request_origin
from config.recaptcha import verify_recaptcha
from config.imgbb import upload_to_imgbb
from config.geocoder import geolocator
import config.sheets as sheets
import traceback

router = APIRouter(
    dependencies=[Depends(verify_request_origin)]
)

@router.post("/tutors/register")
async def register_tutor(
    recaptcha_token: str = Form(...),
    name: str = Form(...),
    subject: str = Form(None),
    major_subjects: str = Form(None),
    qualification: str = Form(...),
    experience: int = Form(...),
    phone: str = Form(...),
    bio: str = Form(...),
    exactLocation: str = Form(None),
    lat: str = Form(None),
    lng: str = Form(None),
    image: UploadFile = File(None),
    profile_url: str = Form(None),
):
    try:
        # ✅ reCAPTCHA verification
        verify_recaptcha(recaptcha_token, "tutor_register")

        image_url = await upload_to_imgbb(image)

        latitude = float(lat) if lat else None
        longitude = float(lng) if lng else None
        city = district = province = tehsil = ""

        if latitude and longitude:
            try:
                loc = geolocator.reverse(f"{latitude}, {longitude}")
                addr = loc.raw.get("address", {})
                city = addr.get("city") or addr.get("town") or ""
                district = addr.get("county") or ""
                province = addr.get("state") or ""
                tehsil = addr.get("suburb") or ""
            except Exception:
                pass

        tutors_sheet = sheets.get_tutors_sheet()
        tutors_sheet.append_row([
            name,
            subject or "",
            f"{qualification} {subject}" if subject else qualification,
            major_subjects or "",
            str(experience),
            province,
            district,
            tehsil,
            city,
            phone,
            bio,
            city,
            city,
            city,
            exactLocation or "",
            image_url,
            str(latitude or ""),
            str(longitude or ""),
            "No",
            profile_url or "",
        ])

        return {
            "message": "Tutor registered successfully!",
            "image_url": image_url,
            "province": province,
            "district": district,
            "tehsil": tehsil,
            "city": city,
        }

    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
