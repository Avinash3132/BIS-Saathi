"""
Thin wrapper around a BGE-M3 sentence-transformers model.

Deliberately NOT imported at module load time anywhere else in the app —
sentence-transformers/torch are heavy dependencies only needed when
AI_DEMO_MODE=false. Importing this module triggers the actual model load,
so callers should only do so inside the real (non-demo) code path.
"""

from functools import lru_cache

from app.config import settings


@lru_cache(maxsize=1)
def _get_model():
    from sentence_transformers import SentenceTransformer

    return SentenceTransformer(settings.EMBEDDING_MODEL)


def embed_texts(texts: list[str]) -> list[list[float]]:
    model = _get_model()
    return model.encode(texts, normalize_embeddings=True).tolist()


def embed_query(query: str) -> list[float]:
    return embed_texts([query])[0]
