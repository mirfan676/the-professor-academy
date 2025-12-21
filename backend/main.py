import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.locations_routes import router as locations_router
from routes.tutor_register import router as register_router
from routes.tutors_routes import router as tutors_router
from routes.jobs_routes import router as jobs_router
from config.sheets import preload_tutors
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Parse allowed origins from .env
ALLOWED_ORIGINS = [
    o.strip() for o in os.getenv("ALLOWED_ORIGINS", "").split(",") if o.strip()
]

# --- Create App ---
app = FastAPI(
    title="APlus Home Tutors API",
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

# --- Register Routers ---
app.include_router(locations_router)
app.include_router(register_router)
app.include_router(tutors_router)
app.include_router(jobs_router)

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
