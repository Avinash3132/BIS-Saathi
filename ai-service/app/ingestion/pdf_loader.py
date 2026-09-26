import os


def load_text_file(path: str) -> str:
    with open(path, "r", encoding="utf-8") as f:
        return f.read()


def load_pdf_file(path: str) -> str:
    """Extract raw text from a PDF using PyMuPDF.

    Only used for real BIS/public source PDFs the user drops into
    data/sources/ — the five bundled demo documents in this repo are plain
    .txt files, so this path isn't exercised by the demo dataset itself.
    """
    import fitz  # PyMuPDF

    text_parts = []
    with fitz.open(path) as doc:
        for page_num, page in enumerate(doc, start=1):
            text_parts.append(f"\n[page {page_num}]\n" + page.get_text())
    return "\n".join(text_parts)


def load_source_documents(source_dir: str):
    """Loads every .txt/.pdf file in source_dir, returning (filename, text) pairs."""
    documents = []
    for filename in sorted(os.listdir(source_dir)):
        path = os.path.join(source_dir, filename)
        if filename.lower().endswith(".txt"):
            documents.append((filename, load_text_file(path)))
        elif filename.lower().endswith(".pdf"):
            documents.append((filename, load_pdf_file(path)))
    return documents
