"""
Thin wrapper around a persistent ChromaDB collection.

Like embedder.py, this is only imported from the real (non-demo) code
path in rag/pipeline.py, so demo mode never needs chromadb installed.
"""

from functools import lru_cache

from app.config import settings

COLLECTION_NAME = "bis_standards_demo"


@lru_cache(maxsize=1)
def _get_client():
    import chromadb

    return chromadb.PersistentClient(path=settings.CHROMA_PERSIST_DIR)


@lru_cache(maxsize=1)
def _get_collection():
    client = _get_client()
    return client.get_or_create_collection(COLLECTION_NAME)


def upsert_chunks(ids: list[str], embeddings: list[list[float]], documents: list[str], metadatas: list[dict]):
    collection = _get_collection()
    collection.upsert(ids=ids, embeddings=embeddings, documents=documents, metadatas=metadatas)


def query(embedding: list[float], top_k: int = 3):
    collection = _get_collection()
    return collection.query(query_embeddings=[embedding], n_results=top_k)


def reset_collection():
    client = _get_client()
    client.delete_collection(COLLECTION_NAME)
    _get_collection.cache_clear()
