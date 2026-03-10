from __future__ import annotations

from typing import Dict, Tuple

from .model_loader import load_vectorizer_and_model


def predict_text(text: str) -> Tuple[str, float]:
    """
    Run inference on a single input text and return
    the predicted label (string) and confidence (0–1).
    """
    vectorizer, model = load_vectorizer_and_model()

    features = vectorizer.transform([text])

    # For XGBoostClassifier-style models
    if hasattr(model, "predict_proba"):
        proba = model.predict_proba(features)[0]
        pred_idx = int(proba.argmax())
        confidence = float(proba[pred_idx])
        if hasattr(model, "classes_"):
            label = str(model.classes_[pred_idx])
        else:
            label = str(pred_idx)
    else:
        # Fallback: no predict_proba, just predict
        pred = model.predict(features)[0]
        label = str(pred)
        confidence = 1.0

    # Normalize label into user-facing string for depression vs not-depression.
    normalized_label = _normalize_prediction_label(label)
    return normalized_label, confidence


def _normalize_prediction_label(raw_label: str) -> str:
    lower = raw_label.lower()

    if any(key in lower for key in ["depression", "depressed", "major_depression"]):
        return "Depression Detected"

    if any(key in lower for key in ["no_depression", "normal", "control", "healthy"]):
        return "Not Detected"

    # Fallback – preserve original for transparency
    return raw_label

