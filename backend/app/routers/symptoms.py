from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import models, schemas, ai_service
from ..database import get_db

router = APIRouter(prefix="/api/symptoms", tags=["Symptom Checker"])

@router.post("/check", response_model=schemas.SymptomResponse)
def check_symptoms(payload: schemas.SymptomInput, db: Session = Depends(get_db)):
    ai_text = ai_service.check_symptoms(payload.symptoms)
    record = models.SymptomQuery(symptoms=payload.symptoms, ai_response=ai_text)
    db.add(record)
    db.commit()
    db.refresh(record)
    return record