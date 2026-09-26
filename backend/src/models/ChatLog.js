const mongoose = require("mongoose");

/**
 * ChatLog — lightweight session metadata for the Standards Assistant.
 * Stores the question, the language, and which source document (if any)
 * the AI service grounded its answer in. No personal data is required.
 */
const ChatLogSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, index: true },
    language: { type: String, enum: ["en", "hi"], default: "en" },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    isNumber: { type: String, default: null },
    sourceDocument: { type: String, default: null },
    grounded: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChatLog", ChatLogSchema);
