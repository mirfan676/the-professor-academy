import os
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from routes.locations_routes import router as locations_router
from routes.tutor_register import router as register_router
from routes.tutors_routes import router as tutors_router
from routes.jobs_routes import router as jobs_router
from config.sheets import preload_tutors
from dotenv import load_dotenv
from utils.ip_location import router as ip_location_router
from starlette.responses import Response
import logging

# Load environment variables
load_dotenv()

# Parse allowed origins from .env
ALLOWED_ORIGINS = [
    o.strip() for o in os.getenv("ALLOWED_ORIGINS", "").split(",") if o.strip()
]

# --- Create App ---
app = FastAPI(
    title="The Professor Academy API",
    version="4.3.0",
)

# --- Configure Logging ---
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# --- CORS Middleware ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,  # only allow domains from .env
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- CSP Middleware --- 
@app.middleware("http")
async def add_csp_header(request, call_next):
    response = await call_next(request)
    # Set Content Security Policy (CSP) header
    response.headers['Content-Security-Policy'] = (
        "default-src 'self'; "
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com "
        "https://www.google.com/recaptcha https://www.gstatic.com https://www.google-analytics.com; "
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
        "font-src 'self' https://fonts.gstatic.com; "
        "img-src 'self' data: https://*.tawk.to https://www.google-analytics.com "
        "https://www.googletagmanager.com https://cdn.jsdelivr.net blob:; "
        "frame-src https://embed.tawk.to https://www.google.com; "
        "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com "
        "https://va.tawk.to wss://*.tawk.to https://www.google.com https://www.googleapis.com/sheets/v4; "
        "object-src 'self' blob:; "
        "frame-ancestors 'self' https://www.google.com; "
        "base-uri 'self';"
    )
    return response

# --- Register Routers ---
app.include_router(locations_router)
app.include_router(register_router)
app.include_router(tutors_router)
app.include_router(jobs_router)
app.include_router(ip_location_router)

# --- Root Endpoint ---
@app.get("/")
def home():
    return {"message": "API disabled for unauthorized access"}

# --- Health Check ---
@app.get("/healthz")
def health_check():
    return {"status": "ok"}

# --- Startup Event ---
@app.on_event("startup")
def startup_event():
    try:
        preload_tutors()
        logger.info("✅ Tutors preloaded successfully on startup")
    except Exception as e:
        logger.error(f"⚠️ Failed to preload tutors on startup: {e}")
        # Do not raise exception, server will still start

# --- CORS Debugging ---
@app.middleware("http")
async def log_request_origin(request: Request, call_next):
    origin = request.headers.get("origin", "")
    referer = request.headers.get("referer", "")
    logger.debug(f"Request from Origin: {origin}, Referer: {referer}")
    response = await call_next(request)
    return response

# --- CORS Middleware and reCAPTCHA Token Verification ---
@app.post("/tutors/register")
async def register_tutor(
    request: Request,
    recaptcha_token: str,
    name: str,
    id_card: str,
    qualification: str,
    subject: str,
    major_subjects: str,
    experience: int,
    phone: str,
    bio: str,
    lat: str,
    lng: str,
    image: str,
):
    try:
        # --- Log the incoming form data ---
        form_data = await request.form()
        logger.debug(f"Received form data: {form_data}")

        # --- Log reCAPTCHA token ---
        logger.debug(f"Received reCAPTCHA token: {recaptcha_token}")

        # --- Verify reCAPTCHA token ---
        # Assuming you have a function `verify_recaptcha`
        verify_recaptcha(recaptcha_token, "tutor_register", request)

        # --- Additional Form Processing ---
        if not name or not id_card or not qualification:
            raise HTTPException(status_code=400, detail="Missing required fields")

        # Example: If ID is already registered
        if is_id_registered(id_card):
            raise HTTPException(status_code=400, detail="⚠️ This ID card is already registered.")

        # --- Save Tutor Details Logic ---
        # Example: Save to database or a sheet, this is a placeholder for your actual logic
        profile_id = f"TUTOR-{uuid.uuid4().hex[:8].upper()}"
        profile_url = f"https://theprofessoracademy.com/tutor/{profile_id}"

        logger.debug(f"Profile ID generated: {profile_id}")

        # Assuming you have a function `save_tutor_details` to save to a database or sheet
        save_tutor_details(
            name, id_card, qualification, subject, major_subjects, experience, phone, bio, lat, lng, image
        )

        return {"message": "✅ Tutor registered successfully", "profile_id": profile_id, "profile_url": profile_url}

    except HTTPException as e:
        logger.error(f"HTTPException occurred: {str(e)}")
        raise e
    except Exception as e:
        logger.error(f"Exception occurred during form submission: {str(e)}")
        raise HTTPException(status_code=500, detail="❌ Failed to register tutor")

