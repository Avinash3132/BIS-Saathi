import json
import os

_SHARED_KB_PATH = os.path.join(
    os.path.dirname(__file__), "..", "..", "..", "shared", "demoKnowledgeBase.json"
)


def load_knowledge_base():
    with open(_SHARED_KB_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


KB_DOCS = load_knowledge_base()
