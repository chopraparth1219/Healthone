import fitz  # PyMuPDF
from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
from .. import models, schemas, ai_service
from ..database import get_db

router = APIRouter(prefix="/api/reports", tags=["Report Summarizer"])

def extract_text_from_pdf(file_bytes: bytes) -> str:
    doc = fitz.open(stream=file_bytes, filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    doc.close()
    return text

@router.post("/summarize", response_model=schemas.ReportResponse)
async def summarize_report(
    file: UploadFile = File(None),
    text: str = Form(None),
    db: Session = Depends(get_db),
):
    if file:
        contents = await file.read()
        report_text = extract_text_from_pdf(contents)
    elif text:
        report_text = text
    else:
        return {"error": "Provide a file or text"}

    summary = ai_service.summarize_report(report_text)
    record = models.ReportSummary(report_text=report_text, summary=summary)
    db.add(record)
    db.commit()
    db.refresh(record)
    return record