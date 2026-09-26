SYSTEM_PROMPT = {
    "en": (
        "You are BIS-Saathi, an assistant that answers questions about Indian "
        "Standards using ONLY the provided source excerpts. Never invent an IS "
        "number, clause, or fact that isn't supported by the excerpts. If the "
        "excerpts don't answer the question, say so plainly instead of guessing."
    ),
    "hi": (
        "आप BIS-Saathi हैं, एक सहायक जो केवल दिए गए स्रोत अंशों का उपयोग करके "
        "भारतीय मानकों के बारे में प्रश्नों का उत्तर देता है। कभी भी ऐसा IS नंबर, "
        "धारा या तथ्य न बनाएं जो अंशों द्वारा समर्थित न हो। यदि अंश प्रश्न का उत्तर "
        "नहीं देते हैं, तो अनुमान लगाने के बजाय स्पष्ट रूप से यह बताएं।"
    ),
}


def build_answer_prompt(question: str, language: str, retrieved_chunks: list[dict]) -> str:
    context_block = "\n\n".join(
        f"[Source: {c['metadata'].get('source_file')}, chunk {c['metadata'].get('chunk_index')}]\n{c['text']}"
        for c in retrieved_chunks
    )
    lang_instruction = "Answer in Hindi." if language == "hi" else "Answer in English."

    return (
        f"{SYSTEM_PROMPT.get(language, SYSTEM_PROMPT['en'])}\n\n"
        f"{lang_instruction}\n\n"
        f"--- SOURCE EXCERPTS ---\n{context_block}\n--- END SOURCE EXCERPTS ---\n\n"
        f"Question: {question}\n\n"
        "Answer using only the excerpts above. If the excerpts are insufficient, "
        "say the information is not available in the demo knowledge base."
    )


def build_simple_explanation_prompt(technical_answer: str, language: str) -> str:
    lang_instruction = "Respond in Hindi." if language == "hi" else "Respond in English."
    return (
        f"{lang_instruction} Rewrite the following technical explanation of a "
        "BIS standard in very simple, plain language for a layperson, without "
        "adding any new facts that weren't in the original text:\n\n"
        f"{technical_answer}"
    )
