from pydantic import BaseModel
from datetime import datetime

class SymptomInput(BaseModel):
    symptoms: str

class SymptomResponse(BaseModel):
    id: int
    symptoms: str
    ai_response: str
    created_at: datetime
    class Config:
        from_attributes = True

class ReportInput(BaseModel):
    report_text: str

class ReportResponse(BaseModel):
    id: int
    summary: str
    created_at: datetime
    class Config:
        from_attributes = True

class RecommendationInput(BaseModel):
    age: int
    gender: str
    weight_kg: float
    height_cm: float
    activity_level: str
    medical_conditions: str = ""
    diet: str = ""

class RecommendationResponse(BaseModel):
    id: int
    advice: str
    created_at: datetime
    class Config:
        from_attributes = True