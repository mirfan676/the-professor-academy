from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
import os
from admin.auth import create_token, admin_required
from utils.google_sheets import tutors_sheet

router = APIRouter(prefix="/api/admin", tags=["Admin"])

# -------------------------
# Pydantic Models
# -------------------------
class AdminLogin(BaseModel):
    username: str
    password: str


class TutorUpdate(BaseModel):
    DateAdded: Optional[str] = None
    ProfileID: Optional[str] = None
    ProfileURL: Optional[str] = None
    FullName: Optional[str] = None
    IDCardNumber: Optional[str] = None
    Qualification: Optional[str] = None
    PrimarySubject: Optional[str] = None
    MajorSubjects: Optional[str] = None
    Experience: Optional[str] = None
    Phone: Optional[str] = None
    Bio: Optional[str] = None
    Province: Optional[str] = None
    District: Optional[str] = None
    Tehsil: Optional[str] = None
    City: Optional[str] = None
    Latitude: Optional[str] = None
    Longitude: Optional[str] = None
    ImageURL: Optional[str] = None
    Verified: Optional[str] = None


class TutorVerify(BaseModel):
    verified: bool


# -------------------------
# Routes
# -------------------------
@router.post("/login", response_model=dict)
def admin_login(data: AdminLogin):
    """
    Admin login. Returns a JWT token if credentials are correct.
    """
    admin_user = os.getenv("ADMIN_USERNAME")
    admin_pass = os.getenv("ADMIN_PASSWORD")

    if data.username == admin_user and data.password == admin_pass:
        token = create_token()
        return {"token": token}

    raise HTTPException(status_code=401, detail="Invalid credentials")


@router.get("/tutors")
def get_all_tutors_admin(user=Depends(admin_required)):
    try:
        records = tutors_sheet.get_all_records(empty2zero=False, head=1)
        print("Fetched tutors:", records)  # Log the records to verify structure
        return records
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching tutors: {e}")


@router.put("/tutors/{row}")
def update_tutor(row: int, data: TutorUpdate, user=Depends(admin_required)):
    updated_fields = data.dict(exclude_unset=True)

    if not updated_fields:
        raise HTTPException(status_code=400, detail="No fields to update")

    try:
        print(f"Updating tutor at row {row} with data: {updated_fields}")

        # Iterate through updated fields and update only those columns
        for key, value in updated_fields.items():
            cell = tutors_sheet.find(key)
            if not cell:
                continue
            tutors_sheet.update_cell(row, cell.col, value)

        return {"success": True, "updated_fields": list(updated_fields.keys())}

    except Exception as e:
        print(f"Error updating tutor: {e}")
        raise HTTPException(status_code=500, detail=f"Error updating tutor: {e}")


@router.put("/tutors/{row}/verify")
def verify_tutor(row: int, data: TutorVerify, user=Depends(admin_required)):
    """
    Verify or unverify a tutor.
    """
    cell = tutors_sheet.find("Verified")
    if not cell:
        raise HTTPException(status_code=500, detail="Verified column not found in sheet")

    tutors_sheet.update_cell(row, cell.col, "Yes" if data.verified else "No")
    return {"row": row, "verified": data.verified}
