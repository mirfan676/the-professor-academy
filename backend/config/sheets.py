import gspread
from datetime import datetime, timedelta
from google.oauth2.service_account import Credentials
from config.settings import SERVICE_ACCOUNT_JSON, SCOPES, SHEET_ID

# ----------------------------
# Google Sheets client
# ----------------------------
try:
    creds = Credentials.from_service_account_info(SERVICE_ACCOUNT_JSON, scopes=SCOPES)
    gspread_client = gspread.authorize(creds)
    print("✅ Google Sheets client authorized successfully")
except Exception as e:
    print("❌ Failed to authorize Google Sheets client:", e)
    raise

# ----------------------------
# Connect to the Tutors sheet
# ----------------------------
try:
    sheet = gspread_client.open_by_key(SHEET_ID).worksheet("Tutors")
    print("✅ Successfully opened Tutors worksheet")
except gspread.SpreadsheetNotFound:
    print(f"❌ Spreadsheet with ID {SHEET_ID} NOT found or access denied")
    raise
except gspread.WorksheetNotFound:
    print("❌ Worksheet 'Tutors' NOT found in spreadsheet. Check exact name and capitalization")
    raise
except Exception as e:
    print("❌ Unknown error while opening sheet:", e)
    raise

# ----------------------------
# Cache globals
# ----------------------------
cached_tutors = []
last_fetch_time = datetime.min
CACHE_DURATION = timedelta(minutes=5)

# ----------------------------
# Helper
# ----------------------------
def s(v):
    """Safe string strip"""
    return str(v).strip() if v else ""

# ----------------------------
# Preload tutors
# ----------------------------
def preload_tutors():
    """
    Load all verified tutors from Google Sheets into cache.
    Handles subjects and major subjects, sets cached_tutors.
    """
    global cached_tutors, last_fetch_time

    try:
        records = sheet.get_all_records(empty2zero=False, head=1)
        print(f"📌 TOTAL ROWS LOADED FROM SHEET: {len(records)}")

        verified = []

        for idx, r in enumerate(records):
            raw_verified = r.get("Verified", None)
            cleaned = s(raw_verified).lower()
            print(f"Row {idx} Verified raw value: {repr(raw_verified)} | cleaned: {repr(cleaned)}")

            # Skip unverified tutors
            if not cleaned.startswith("y"):
                print(f"❌ Row {idx} skipped — NOT verified")
                continue

            # Primary subject
            primary_subject = s(r.get("Subject"))
            
            # Major subjects, deduplicated, excluding primary
            major_subjects_raw = r.get("Major Subjects", "")
            major_subjects_list = []
            if major_subjects_raw:
                major_subjects_list = [x.strip() for x in str(major_subjects_raw).split(",") if x.strip()]
                if primary_subject in major_subjects_list:
                    major_subjects_list.remove(primary_subject)

            # Construct tutor dict
            tutor = {
                "Profile ID": s(r.get("Profile ID")),
                "Profile URL": s(r.get("Profile URL")),
                "Name": s(r.get("Full Name")),
                "ID Card Number": s(r.get("ID Card Number")),
                "Qualification": s(r.get("Qualification")),
                "Subject": primary_subject,
                "Major Subjects": ",".join(major_subjects_list),
                "Experience": s(r.get("Experience")),
                "Phone": s(r.get("Phone")),
                "Bio": s(r.get("Bio")),
                "Province": s(r.get("Province")),
                "District": s(r.get("District")),
                "Tehsil": s(r.get("Tehsil")),
                "City": s(r.get("City")),
                "Latitude": s(r.get("Latitude")),
                "Longitude": s(r.get("Longitude")),
                "Image URL": s(r.get("Image URL")),
                "Verified": cleaned.startswith("y"),
            }

            verified.append(tutor)
            print(f"✅ Row {idx} accepted: {tutor['Name']}")

        if not verified:
            raise Exception("No verified tutors found in the sheet.")

        cached_tutors = verified
        last_fetch_time = datetime.utcnow()
        print(f"🔥 FINAL VERIFIED COUNT: {len(cached_tutors)}")

    except Exception as e:
        cached_tutors = []
        last_fetch_time = datetime.min
        print("⚠️ Preload failed:", e)
        raise Exception(f"Failed to load tutors from sheet: {e}")
# ----------------------------
# Check if ID card already exists
# ----------------------------
def is_id_registered(id_card: str) -> bool:
    """
    Check if a tutor with this 13-digit ID exists in cached tutors.
    """
    return any(t["ID Card Number"] == id_card for t in cached_tutors)

# ----------------------------
# Load Jobs Sheet
# ----------------------------
def load_jobs_sheet():
    try:
        jobs_sheet = gspread_client.open_by_key(SHEET_ID).worksheet("Jobs")
        records = jobs_sheet.get_all_records(empty2zero=False, head=1)
        return records
    except gspread.WorksheetNotFound:
        print("❌ Worksheet 'Jobs' NOT found. Check exact name and capitalization")
        raise
    except Exception as e:
        print("⚠️ Failed to load jobs sheet:", e)
        raise
