from __future__ import annotations

from typing import Any, Dict

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from .model_loader import load_vectorizer_and_model
from .predictor import predict_text


class PredictRequest(BaseModel):
    text: str = Field(..., min_length=1, description="User-provided mental health text.")


class PredictResponse(BaseModel):
    prediction: str
    confidence: float


app = FastAPI(
    title="Mental Health / Depression Detection API",
    description=(
        "Production-ready FastAPI backend for a TF-IDF + XGBoost model that screens "
        "text for indicators of depression. Not a medical device."
    ),
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict to your frontend domain.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def _load_model_on_startup() -> None:
    """
    Eagerly load and cache the vectorizer and model so that the first
    request does not pay the I/O cost.
    """
    load_vectorizer_and_model()


@app.post("/predict", response_model=PredictResponse)
def predict(request: PredictRequest) -> Dict[str, Any]:
    """
    Run the depression detection model on provided text.
    """
    prediction_label, confidence = predict_text(request.text)
    return {
        "prediction": prediction_label,
        "confidence": confidence,
    }


@app.get("/health", tags=["health"])
def health_check() -> Dict[str, str]:
    return {"status": "ok"}

