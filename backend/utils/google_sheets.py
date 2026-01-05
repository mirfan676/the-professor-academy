import gspread
from google.oauth2.service_account import Credentials
from config.settings import SERVICE_ACCOUNT_JSON, SCOPES, SHEET_ID

creds = Credentials.from_service_account_info(
    SERVICE_ACCOUNT_JSON,
    scopes=SCOPES
)

gspread_client = gspread.authorize(creds)

tutors_sheet = gspread_client.open_by_key(SHEET_ID).worksheet("Tutors")
jobs_sheet = gspread_client.open_by_key(SHEET_ID).worksheet("Jobs")
