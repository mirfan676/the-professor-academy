from fastapi import APIRouter, HTTPException, Depends
from typing import List, Dict
from config.sheets import load_jobs_sheet
from config.security import verify_request_origin

# -------------------------
# Router
# -------------------------
router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"],
    dependencies=[Depends(verify_request_origin)]  # Applied only to protected routes
)

# -------------------------
# Admin / protected endpoint: fetch all jobs
# -------------------------
@router.get("/", response_model=Dict[str, List[Dict]])
def get_jobs():
    """
    Fetch all job listings from Google Sheets.
    Protected by `verify_request_origin`.

    Returns:
        JSON object with `jobs` key containing all jobs as a list of dicts.
    """
    try:
        records = load_jobs_sheet()  # Returns list of dicts

        # Return empty array if sheet has no jobs
        if not records:
            return {"jobs": []}

        # Optional: normalize keys if needed
        normalized = [
            {k.strip(): v for k, v in job.items()} for job in records
        ]

        return {"jobs": normalized}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load jobs: {e}")


# -------------------------
# Public endpoint: fetch only open jobs
# -------------------------
@router.get("/public", response_model=List[Dict])
def get_public_jobs():
    """
    Public endpoint — does NOT require `verify_request_origin`.
    Filters only jobs where status == "open".

    Returns:
        List of job dicts.
    """
    try:
        records = load_jobs_sheet()  # Returns list of dicts

        if not records:
            return []

        # Normalize keys
        normalized = [{k.strip(): v for k, v in job.items()} for job in records]

        # Filter only open jobs
        public_jobs = [
            job for job in normalized
            if str(job.get("status", "")).strip().lower() == "open"
        ]

        return public_jobs

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load jobs: {e}")
