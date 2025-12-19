from fastapi import APIRouter, Query, Depends
from config.security import verify_request_origin
from config.locations import pakistan_data

router = APIRouter(
    dependencies=[Depends(verify_request_origin)]
)

@router.get("/locations")
def get_locations():
    return pakistan_data

@router.get("/districts")
def get_districts(province: str = Query(...)):
    return {"districts": list(pakistan_data.get(province, {}).keys())}

@router.get("/tehsils")
def get_tehsils(province: str, district: str):
    return {"tehsils": list(pakistan_data.get(province, {}).get(district, {}).keys())}

@router.get("/areas")
def get_areas(province: str, district: str, tehsil: str):
    return {"areas": pakistan_data.get(province, {}).get(district, {}).get(tehsil, [])}
