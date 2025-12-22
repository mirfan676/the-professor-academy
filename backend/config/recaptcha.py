from google.cloud import recaptchaenterprise_v1
from fastapi import HTTPException, Request
from config.settings import (
    RECAPTCHA_SA_JSON,
    RECAPTCHA_PROJECT_ID,
    RECAPTCHA_SITE_KEY
)

# Create Recaptcha Client
recaptcha_client = recaptchaenterprise_v1.RecaptchaEnterpriseServiceClient.from_service_account_info(
    RECAPTCHA_SA_JSON
)


def verify_recaptcha(token: str, expected_action: str, request: Request):
    try:
        event = recaptchaenterprise_v1.Event(
            token=token,
            site_key=RECAPTCHA_SITE_KEY,
            user_ip_address=request.client.host  # improves score reliability
        )

        assessment = recaptchaenterprise_v1.Assessment(
            event=event
        )

        request_obj = recaptchaenterprise_v1.CreateAssessmentRequest(
            parent=f"projects/{RECAPTCHA_PROJECT_ID}",
            assessment=assessment
        )

        response = recaptcha_client.create_assessment(request=request_obj)
        props = response.token_properties

        # Validate Token
        if not props.valid:
            raise HTTPException(status_code=400, detail="Invalid reCAPTCHA token")

        # Validate Correct Action
        if props.action != expected_action:
            raise HTTPException(status_code=400,
                                detail=f"Invalid reCAPTCHA action: {props.action}")

        # Risk Score Check (adjust if needed)
        if response.risk_analysis.score < 0.5:
            raise HTTPException(status_code=400, detail="Bot detected")

        return True

    except HTTPException:
        raise
    except Exception as e:
        print("reCAPTCHA error:", e)
        raise HTTPException(status_code=400, detail="reCAPTCHA validation failed")
