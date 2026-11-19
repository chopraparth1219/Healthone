from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import models, schemas, ai_service
from ..database import get_db

router = APIRouter(prefix="/api/recommendations", tags=["Health Recommendations"])

@router.post("/generate", response_model=schemas.RecommendationResponse)
def generate_recommendations(
    payload: schemas.RecommendationInput, db: Session = Depends(get_db)
):
    profile = payload.dict()
    advice = ai_service.get_recommendations(profile)
    record = models.Recommendation(profile_data=str(profile), advice=advice)
    db.add(record)
    db.commit()
    db.refresh(record)
    return record