import os
import logging
from pathlib import Path

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from dotenv import load_dotenv

# Routers & utils
from routes.locations_routes import router as locations_router
from routes.tutor_register import router as register_router
from routes.tutors_routes import router as tutors_router
from routes.jobs_routes import router as jobs_router
from utils.ip_location import router as ip_location_router
from admin.admin_routes import router as admin_router

from config.sheets import preload_tutors
from config.recaptcha import verify_recaptcha

# --------------------------------------------------
# Logging
# --------------------------------------------------
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger("main")

# --------------------------------------------------
# Environment
# --------------------------------------------------
load_dotenv()

# --------------------------------------------------
# Paths (IMPORTANT: Vite uses dist/, not build/)
# --------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent
FRONTEND_DIST = BASE_DIR / "frontend" / "dist"
STATIC_PATH = FRONTEND_DIST / "assets"

# --------------------------------------------------
# Create App
# --------------------------------------------------
app = FastAPI(
    title="The Professor Academy API",
    version="4.3.0",
)

# --------------------------------------------------
# CORS (Production Safe)
# --------------------------------------------------
ALLOWED_ORIGINS = [
    "https://theprofessoracademy.com",
    "https://www.theprofessoracademy.com",
    "https://the-professor-academy.vercel.app",
    "http://localhost:3000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------
# Serve React Static Files (ONLY if built)
# --------------------------------------------------
if STATIC_PATH.exists():
    app.mount("/assets", StaticFiles(directory=STATIC_PATH), name="assets")
    logger.info("✅ React assets mounted at /assets")
else:
    logger.warning("⚠️ React dist/assets not found")

# --------------------------------------------------
# Register Routers
# --------------------------------------------------
app.include_router(admin_router)
app.include_router(locations_router)
app.include_router(register_router)
app.include_router(tutors_router)
app.include_router(jobs_router)
app.include_router(ip_location_router)

# --------------------------------------------------
# Root & Health
# --------------------------------------------------
@app.get("/")
def home():
    return {"message": "API running"}

@app.get("/healthz")
def health_check():
    return {"status": "ok"}

# --------------------------------------------------
# Startup Event
# --------------------------------------------------
@app.on_event("startup")
def startup_event():
    try:
        preload_tutors()
        logger.info("✅ Tutors preloaded successfully on startup")
    except Exception as e:
        logger.error(f"⚠️ Failed to preload tutors: {e}")

# --------------------------------------------------
# Tutor Register (Debug + reCAPTCHA)
# --------------------------------------------------
@app.post("/tutors/register")
async def register_tutor(request: Request):
    logger.debug("Tutor registration attempt")

    origin = request.headers.get("origin", "")
    referer = request.headers.get("referer", "")
    logger.debug(f"Origin: {origin}, Referer: {referer}")

    form_data = await request.form()
    logger.debug(f"Form data: {dict(form_data)}")

    recaptcha_token = form_data.get("recaptcha_token")
    if not recaptcha_token:
        raise HTTPException(status_code=400, detail="Missing reCAPTCHA token")

    try:
        verify_recaptcha(recaptcha_token, "tutor_register", request)
        logger.debug("reCAPTCHA verified")
    except HTTPException as e:
        raise HTTPException(status_code=400, detail=f"reCAPTCHA failed: {e.detail}")

    return {"message": "✅ Tutor registered successfully"}

# --------------------------------------------------
# React Router Fallback (IMPORTANT)
# --------------------------------------------------
@app.get("/{full_path:path}")
async def serve_react_app(full_path: str):
    """
    Serve React index.html for all frontend routes
    (supports /admin/login, refresh, direct URLs)
    """
    index_path = FRONTEND_DIST / "index.html"
    if index_path.exists():
        return FileResponse(index_path)
    return {"error": "Frontend not built"}
