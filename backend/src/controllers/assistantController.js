const { randomUUID } = require("crypto");
const { askAssistant, explainSimply } = require("../services/aiServiceClient");
const { dbIsConnected } = require("../config/db");
const ChatLog = require("../models/ChatLog");

async function ask(req, res, next) {
  try {
    const { question, language = "en", sessionId } = req.body;
    const result = await askAssistant({ question, language });

    if (dbIsConnected()) {
      ChatLog.create({
        sessionId: sessionId || randomUUID(),
        language,
        question,
        answer: result.answer,
        isNumber: result.isNumber,
        sourceDocument: result.sources?.[0]?.document || null,
        grounded: result.grounded,
      }).catch((err) => console.warn("[assistantController] Failed to log chat:", err.message));
    }

    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function explain(req, res, next) {
  try {
    const { question, language = "en", isNumber } = req.body;
    if (!question) {
      return res.status(400).json({ error: "`question` is required for explain-simply." });
    }
    const result = await explainSimply({ question, language, isNumber });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = { ask, explain };
