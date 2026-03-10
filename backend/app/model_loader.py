from __future__ import annotations

import pathlib
from functools import lru_cache
from typing import Tuple

import joblib

BASE_DIR = pathlib.Path(__file__).resolve().parent.parent
MODELS_DIR = BASE_DIR / "models"


@lru_cache(maxsize=1)
def load_vectorizer_and_model() -> Tuple[object, object]:
    """
    Load TF-IDF vectorizer and XGBoost model once and cache them.

    Expected filenames:
    - tfidf_vectorizer.joblib
    - xgb_mental_health_model.joblib
    """
    vectorizer_path = MODELS_DIR / "tfidf_vectorizer.joblib"
    model_path = MODELS_DIR / "xgb_mental_health_model.joblib"

    if not vectorizer_path.exists():
        raise FileNotFoundError(f"Missing TF-IDF vectorizer at {vectorizer_path}")

    if not model_path.exists():
        raise FileNotFoundError(f"Missing XGBoost model at {model_path}")

    vectorizer = joblib.load(vectorizer_path)
    model = joblib.load(model_path)
    return vectorizer, model

