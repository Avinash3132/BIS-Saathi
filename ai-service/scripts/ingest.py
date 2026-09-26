"""
Run this to (re)populate ChromaDB from the demo source documents, using
real BGE-M3 embeddings. Only needed when AI_DEMO_MODE=false.

Usage (from ai-service/):
    python scripts/ingest.py
"""

import json
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from app.config import settings  # noqa: E402
from app.ingestion.chunker import build_chunks_with_metadata  # noqa: E402
from app.ingestion.pdf_loader import load_source_documents  # noqa: E402

# Maps each demo source file to the metadata the RAG pipeline expects
# (IS number, title, page, clause) — mirrors shared/demoKnowledgeBase.json.
_SHARED_KB_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "shared", "demoKnowledgeBase.json")


def _load_kb_metadata_by_file():
    with open(_SHARED_KB_PATH, "r", encoding="utf-8") as f:
        docs = json.load(f)
    return {d["sourceFile"]: d for d in docs}


def main():
    from app.embeddings.embedder import embed_texts
    from app.retrieval.vector_store import reset_collection, upsert_chunks

    kb_by_file = _load_kb_metadata_by_file()
    documents = load_source_documents(settings.SOURCE_DOCS_DIR)

    if not documents:
        print(f"No source documents found in {settings.SOURCE_DOCS_DIR}")
        return

    print("Resetting ChromaDB collection...")
    try:
        reset_collection()
    except Exception:
        pass  # fine if it didn't exist yet

    total_chunks = 0
    for filename, text in documents:
        kb_entry = kb_by_file.get(filename, {})
        extra_metadata = {
            "is_number": kb_entry.get("isNumber"),
            "document_title": kb_entry.get("title", {}).get("en"),
            "page": kb_entry.get("page"),
            "clause": kb_entry.get("clause"),
        }
        chunks = build_chunks_with_metadata(filename, text, extra_metadata)

        ids = [f"{filename}::{c['metadata']['chunk_index']}" for c in chunks]
        texts = [c["text"] for c in chunks]
        metadatas = [c["metadata"] for c in chunks]

        print(f"Embedding {len(texts)} chunk(s) from {filename}...")
        embeddings = embed_texts(texts)
        upsert_chunks(ids=ids, embeddings=embeddings, documents=texts, metadatas=metadatas)
        total_chunks += len(texts)

    print(f"Done. Ingested {total_chunks} chunks from {len(documents)} document(s) into ChromaDB.")


if __name__ == "__main__":
    main()
