from app.demo.demo_knowledge_base import KB_DOCS

NOT_FOUND_TEXT = {
    "en": (
        "This information isn't available in the demo knowledge base yet. "
        "The demo currently covers drinking water, cement, LPG cylinders, "
        "helmets and footwear standards."
    ),
    "hi": (
        "यह जानकारी अभी डेमो नॉलेज बेस में उपलब्ध नहीं है। डेमो में फिलहाल "
        "पेयजल, सीमेंट, एलपीजी सिलेंडर, हेलमेट और फुटवियर मानक शामिल हैं।"
    ),
}


def retrieve_doc(question: str):
    """Very small, transparent keyword-overlap retriever.

    This stands in for the BGE-M3 + ChromaDB semantic retrieval step when
    AI_DEMO_MODE=true (or when the real pipeline is unavailable), so the
    product is always demonstrable end to end.
    """
    q = question.lower()
    best, best_score = None, 0
    for doc in KB_DOCS:
        score = sum(1 for kw in doc["keywords"] if kw.lower() in q)
        if score > best_score:
            best, best_score = doc, score
    return best if best_score > 0 else None


def demo_answer(question: str, language: str = "en") -> dict:
    lang = language if language in ("en", "hi") else "en"
    doc = retrieve_doc(question)

    if doc is None:
        return {
            "answer": NOT_FOUND_TEXT[lang],
            "grounded": False,
            "isNumber": None,
            "simpleExplanation": None,
            "relevantTo": None,
            "sources": [],
        }

    return {
        "answer": doc["answer"][lang],
        "grounded": True,
        "isNumber": doc["isNumber"],
        "simpleExplanation": doc["simple"][lang],
        "relevantTo": doc["relevantTo"][lang],
        "sources": [
            {
                "document": doc["title"][lang],
                "sourceFile": doc["sourceFile"],
                "page": doc["page"],
                "clause": doc["clause"],
            }
        ],
    }
