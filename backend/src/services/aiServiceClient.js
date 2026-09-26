const axios = require("axios");
const { demoAssistantResponse } = require("./demoAssistantFallback");

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://localhost:8000";
const DEMO_MODE = process.env.DEMO_MODE === "true";

/**
 * Proxies a question to the FastAPI RAG service.
 * If the AI service is unreachable, transparently falls back to a
 * deterministic demo response rather than letting the whole request fail —
 * this is what SIH26107 item 22 calls "DEMO MODE".
 */
async function askAssistant({ question, language }) {
  try {
    const { data } = await axios.post(
      `${AI_SERVICE_URL}/api/ask`,
      { question, language },
      { timeout: 60000 }
    );
    return { ...data, source: "live" };
  } catch (err) {
    console.warn(`[aiServiceClient] AI service unreachable (${err.message}). Falling back to demo response.`);
    if (!DEMO_MODE) {
      throw new Error("AI service is unavailable and DEMO_MODE is disabled.");
    }
    return { ...demoAssistantResponse(question, language), source: "demo-fallback" };
  }
}

async function explainSimply({ question, language, isNumber }) {
  try {
    const { data } = await axios.post(
      `${AI_SERVICE_URL}/api/explain-simply`,
      { question, language, isNumber },
      { timeout: 60000 }
    );
    return { ...data, source: "live" };
  } catch (err) {
    console.warn(`[aiServiceClient] AI service unreachable for explain-simply (${err.message}).`);
    if (!DEMO_MODE) {
      throw new Error("AI service is unavailable and DEMO_MODE is disabled.");
    }
    const fallback = demoAssistantResponse(question, language);
    return { simpleExplanation: fallback.simpleExplanation, source: "demo-fallback" };
  }
}

module.exports = { askAssistant, explainSimply };
