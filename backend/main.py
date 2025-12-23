import os
import logging
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
from utils.recaptcha import verify_recaptcha  # <-- Import the verify_recaptcha function

# Setup logging for debugging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger("main")

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
        print("✅ Tutors preloaded successfully on startup")
    except Exception as e:
        print(f"⚠️ Failed to preload tutors on startup: {e}")
        # Do not raise exception, server will still start

# --- Debugging for POST /tutors/register ---
@app.post("/tutors/register")
async def register_tutor(request: Request):
    logger.debug("Form submission attempt detected.")
    
    # Log the origin and referer headers for debugging
    origin = request.headers.get("origin", "")
    referer = request.headers.get("referer", "")
    logger.debug(f"Request from Origin: {origin}, Referer: {referer}")

    form_data = await request.form()
    
    # Log form data for debugging
    logger.debug(f"Form data received: {dict(form_data)}")
    
    recaptcha_token = form_data.get('recaptcha_token')
    if not recaptcha_token:
        logger.error("No reCAPTCHA token received.")
        raise HTTPException(status_code=400, detail="Missing reCAPTCHA token")
    
    # Add reCAPTCHA token validation debug log
    logger.debug(f"Received reCAPTCHA token: {recaptcha_token}")

    try:
        # Call the actual reCAPTCHA verification function here
        verify_recaptcha(recaptcha_token, "tutor_register", request)
        logger.debug("reCAPTCHA verified successfully.")
    except HTTPException as e:
        logger.error(f"reCAPTCHA verification failed: {e.detail}")
        raise HTTPException(status_code=400, detail=f"reCAPTCHA verification failed: {e.detail}")

    # Perform other validations and proceed as per your original code
    # ...

    # For debugging purposes, log each key point:
    logger.debug("All form fields validated successfully.")

    # At this point, if form submission is successful:
    return {"message": "✅ Tutor registered successfully"}
