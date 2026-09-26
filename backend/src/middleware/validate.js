const CERT_ID_PATTERN = /^[A-Za-z0-9-]{4,40}$/;

function validateAssistantRequest(req, res, next) {
  const { question, language } = req.body || {};

  if (typeof question !== "string" || question.trim().length === 0) {
    return res.status(400).json({ error: "`question` is required and must be a non-empty string." });
  }
  if (question.length > 500) {
    return res.status(400).json({ error: "`question` is too long (max 500 characters)." });
  }
  if (language && !["en", "hi"].includes(language)) {
    return res.status(400).json({ error: "`language` must be 'en' or 'hi'." });
  }
  next();
}

function validateCertificateId(req, res, next) {
  const id = req.params.id || req.body?.certificateId;
  if (!id || !CERT_ID_PATTERN.test(id)) {
    return res.status(400).json({ error: "Invalid certificate id format." });
  }
  next();
}

module.exports = { validateAssistantRequest, validateCertificateId };
