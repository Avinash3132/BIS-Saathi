from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.config import settings
from app.rag.pipeline import get_answer, get_simple_explanation

router = APIRouter()


class AskRequest(BaseModel):
    question: str = Field(..., min_length=1, max_length=500)
    language: str = Field(default="en", pattern="^(en|hi)$")


class ExplainRequest(BaseModel):
    question: str = Field(..., min_length=1, max_length=500)
    language: str = Field(default="en", pattern="^(en|hi)$")
    isNumber: str | None = None


@router.get("/health")
def health():
    return {"status": "ok", "service": "bis-saathi-ai-service", "demoMode": settings.AI_DEMO_MODE}


@router.post("/ask")
def ask(payload: AskRequest):
    try:
        return get_answer(payload.question, payload.language)
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=500, detail="Failed to generate an answer.") from exc


@router.post("/explain-simply")
def explain_simply(payload: ExplainRequest):
    try:
        return get_simple_explanation(payload.question, payload.language, payload.isNumber)
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=500, detail="Failed to generate a simple explanation.") from exc
