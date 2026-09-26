from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import router
from app.config import settings

app = FastAPI(
    title="BIS-Saathi AI Service",
    description=(
        "RAG service for the BIS-Saathi SIH26107 prototype. Serves grounded, "
        "source-cited answers over a small demo knowledge base of Indian "
        "Standards. NOT connected to any official BIS database."
    ),
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tightened at the Express layer in front of this service
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")


@app.get("/")
def root():
    return {
        "service": "bis-saathi-ai-service",
        "demoMode": settings.AI_DEMO_MODE,
        "docs": "/docs",
    }
