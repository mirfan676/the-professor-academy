import os
import json
from google.oauth2.service_account import Credentials
from dotenv import load_dotenv

load_dotenv()

SERVICE_ACCOUNT_JSON = json.loads(os.environ["SERVICE_ACCOUNT_JSON"])
RECAPTCHA_SA_JSON = json.loads(os.environ["RECAPTCHA_SERVICE_ACCOUNT_JSON"])

SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]

# ✅ Correct: load actual sheet ID from environment
SHEET_ID = os.environ.get("SHEET_ID")

IMGBB_API_KEY = os.environ.get("IMGBB_API_KEY", "")

RECAPTCHA_PROJECT_ID = os.environ["GCLOUD_PROJECT_ID"]
RECAPTCHA_SITE_KEY = os.environ["RECAPTCHA_SITE_KEY_TPA"]
