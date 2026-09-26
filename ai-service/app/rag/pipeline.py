"""
Orchestrates the retrieval-augmented generation flow described in the
architecture doc:

    query -> embed -> ChromaDB top-k -> prompt construction -> Ollama (Llama 3 8B)
    -> validated, source-mapped response

When settings.AI_DEMO_MODE is true, or when any real-pipeline step throws
(Ollama not running, ChromaDB not populated, embedding model not
downloaded, etc.), this module transparently falls back to the
deterministic keyword-retrieval demo response so the product never breaks
mid-demo — this mirrors backend/src/services/aiServiceClient.js on the
Node side, one layer further out.
"""

import logging

from app.config import settings
from app.demo.demo_responses import demo_answer
from app.rag.prompt_templates import build_answer_prompt, build_simple_explanation_prompt

logger = logging.getLogger("bis_saathi.rag")


def _call_ollama(prompt: str) -> str:
    import requests

    response = requests.post(
        f"{settings.OLLAMA_BASE_URL}/api/generate",
        json={"model": settings.OLLAMA_MODEL, "prompt": prompt, "stream": False},
        timeout=60,
    )
    response.raise_for_status()
    return response.json().get("response", "").strip()


def _real_answer(question: str, language: str) -> dict:
    from app.embeddings.embedder import embed_query
    from app.retrieval.vector_store import query as vector_query

    query_embedding = embed_query(question)
    results = vector_query(query_embedding, top_k=3)

    documents = results.get("documents", [[]])[0]
    metadatas = results.get("metadatas", [[]])[0]
    distances = results.get("distances", [[]])[0]

    if not documents:
        raise RuntimeError("No chunks retrieved from ChromaDB — has ingestion been run?")

    # Simple relevance gate: if even the closest chunk is too far away,
    # treat it as "not found" rather than forcing a low-quality answer.
    # Note: ChromaDB default is squared L2 distance on normalized embeddings (0.0 to 2.0).
    RELEVANCE_THRESHOLD = 1.05
    if distances and distances[0] > RELEVANCE_THRESHOLD:
        from app.demo.demo_responses import NOT_FOUND_TEXT

        return {
            "answer": NOT_FOUND_TEXT.get(language, NOT_FOUND_TEXT["en"]),
            "grounded": False,
            "isNumber": None,
            "simpleExplanation": None,
            "relevantTo": None,
            "sources": [],
        }

    retrieved_chunks = [{"text": d, "metadata": m} for d, m in zip(documents, metadatas)]
    prompt = build_answer_prompt(question, language, retrieved_chunks)
    answer_text = _call_ollama(prompt)

    top_meta = metadatas[0]
    return {
        "answer": answer_text,
        "grounded": True,
        "isNumber": top_meta.get("is_number"),
        "simpleExplanation": None,  # generated on demand via /explain-simply
        "relevantTo": top_meta.get("relevant_to"),
        "sources": [
            {
                "document": m.get("document_title"),
                "sourceFile": m.get("source_file"),
                "page": m.get("page"),
                "clause": m.get("clause"),
            }
            for m in metadatas
        ],
    }


def get_answer(question: str, language: str = "en") -> dict:
    if settings.AI_DEMO_MODE:
        return demo_answer(question, language)

    try:
        return _real_answer(question, language)
    except Exception as exc:  # noqa: BLE001 — deliberate broad catch for graceful fallback
        logger.warning("Real RAG pipeline failed (%s); falling back to demo answer.", exc)
        return demo_answer(question, language)


def get_simple_explanation(question: str, language: str = "en", is_number: str | None = None) -> dict:
    if not settings.AI_DEMO_MODE:
        try:
            base = get_answer(question, language)
            if base.get("grounded"):
                prompt = build_simple_explanation_prompt(base["answer"], language)
                simple_text = _call_ollama(prompt)
                return {"simpleExplanation": simple_text}
        except Exception as exc:  # noqa: BLE001
            logger.warning("Real explain-simply failed (%s); falling back to demo.", exc)

    fallback = demo_answer(question, language)
    return {"simpleExplanation": fallback.get("simpleExplanation")}
