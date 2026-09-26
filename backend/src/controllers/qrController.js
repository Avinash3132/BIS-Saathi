const { generateCertificateQr } = require("../services/qrService");
const { findCertificate } = require("./certificateController");

async function getCertificateQr(req, res, next) {
  try {
    const { id } = req.params;
    const cert = await findCertificate(id);
    if (!cert) {
      return res.status(404).json({ error: "No certificate found with that ID in the demo dataset." });
    }

    const frontendBaseUrl = process.env.FRONTEND_BASE_URL || "http://localhost:5173";
    const { dataUrl, encodedUrl } = await generateCertificateQr(cert.certificateId, frontendBaseUrl);

    res.json({ certificateId: cert.certificateId, qrDataUrl: dataUrl, encodedUrl });
  } catch (err) {
    next(err);
  }
}

module.exports = { getCertificateQr };
