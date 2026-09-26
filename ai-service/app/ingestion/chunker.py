import re


def clean_text(text: str) -> str:
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def chunk_text(text: str, chunk_size: int = 800, overlap: int = 120):
    """Simple sliding-window chunker over characters.

    Good enough for a small demo corpus of five short documents; a
    production ingestion pipeline would chunk on semantic/paragraph
    boundaries and track page numbers per character offset.
    """
    text = clean_text(text)
    if len(text) <= chunk_size:
        return [text]

    chunks = []
    start = 0
    while start < len(text):
        end = min(start + chunk_size, len(text))
        chunks.append(text[start:end])
        if end == len(text):
            break
        start = end - overlap
    return chunks


def build_chunks_with_metadata(filename: str, text: str, extra_metadata: dict | None = None):
    """Returns a list of {text, metadata} dicts ready to embed."""
    extra_metadata = extra_metadata or {}
    chunks = chunk_text(text)
    return [
        {
            "text": chunk,
            "metadata": {
                "source_file": filename,
                "chunk_index": i,
                **extra_metadata,
            },
        }
        for i, chunk in enumerate(chunks)
    ]
