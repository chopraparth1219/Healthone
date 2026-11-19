from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine
from . import models
from .routers import symptoms, reports, recommendations

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="HealthOne API", version="1.0")

# This block is critical for frontend-backend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # Allows your Next.js app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(symptoms.router)
app.include_router(reports.router)
app.include_router(recommendations.router)

@app.get("/")
def root():
    return {"message": "HealthOne API is running"}