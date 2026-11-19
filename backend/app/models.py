from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from .database import Base

class SymptomQuery(Base):
    __tablename__ = "symptom_queries"
    id = Column(Integer, primary_key=True, index=True)
    symptoms = Column(Text, nullable=False)
    ai_response = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class ReportSummary(Base):
    __tablename__ = "report_summaries"
    id = Column(Integer, primary_key=True, index=True)
    report_text = Column(Text, nullable=False)
    summary = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class Recommendation(Base):
    __tablename__ = "recommendations"
    id = Column(Integer, primary_key=True, index=True)
    profile_data = Column(Text, nullable=False)
    advice = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)