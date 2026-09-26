const express = require("express");
const { ask, explain } = require("../controllers/assistantController");
const { validateAssistantRequest } = require("../middleware/validate");

const router = express.Router();

router.post("/ask", validateAssistantRequest, ask);
router.post("/explain-simply", explain);

module.exports = router;
