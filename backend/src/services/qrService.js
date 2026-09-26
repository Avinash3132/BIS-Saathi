const QRCode = require("qrcode");

/**
 * Generates a QR code (as a data URL) that encodes a verification URL for
 * the given certificate id. The frontend's certificate detail page renders
 * this directly in an <img> tag.
 */
async function generateCertificateQr(certificateId, baseUrl) {
  const verificationUrl = `${baseUrl.replace(/\/$/, "")}/certificate/${certificateId}`;
  const dataUrl = await QRCode.toDataURL(verificationUrl, {
    errorCorrectionLevel: "M",
    margin: 2,
    width: 320,
  });
  return { dataUrl, encodedUrl: verificationUrl };
}

module.exports = { generateCertificateQr };
