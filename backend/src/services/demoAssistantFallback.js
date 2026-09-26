const fs = require("fs");
const path = require("path");

const KB_PATH = path.join(__dirname, "..", "..", "..", "shared", "demoKnowledgeBase.json");
const KB_DOCS = JSON.parse(fs.readFileSync(KB_PATH, "utf-8"));

const NOT_FOUND_TEXT = {
  en: "This information isn't available in the demo knowledge base yet. The demo currently covers drinking water, cement, LPG cylinders, helmets and footwear standards.",
  hi: "यह जानकारी अभी डेमो नॉलेज बेस में उपलब्ध नहीं है। डेमो में फिलहाल पेयजल, सीमेंट, एलपीजी सिलेंडर, हेलमेट और फुटवियर मानक शामिल हैं।",
};

function retrieveDoc(question) {
  const q = question.toLowerCase();
  let best = null;
  let bestScore = 0;
  for (const doc of KB_DOCS) {
    let score = 0;
    for (const kw of doc.keywords) {
      if (q.includes(kw.toLowerCase())) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = doc;
    }
  }
  return bestScore > 0 ? best : null;
}

/**
 * Mirrors the shape returned by the FastAPI /api/ask endpoint so the
 * frontend never has to know whether it got a live or fallback answer.
 */
function demoAssistantResponse(question, language = "en") {
  const lang = language === "hi" ? "hi" : "en";
  const doc = retrieveDoc(question);

  if (!doc) {
    return {
      answer: NOT_FOUND_TEXT[lang],
      grounded: false,
      isNumber: null,
      simpleExplanation: null,
      relevantTo: null,
      sources: [],
    };
  }

  return {
    answer: doc.answer[lang],
    grounded: true,
    isNumber: doc.isNumber,
    simpleExplanation: doc.simple[lang],
    relevantTo: doc.relevantTo[lang],
    sources: [
      {
        document: doc.title[lang],
        sourceFile: doc.sourceFile,
        page: doc.page,
        clause: doc.clause,
      },
    ],
  };
}

module.exports = { demoAssistantResponse, retrieveDoc, KB_DOCS };
