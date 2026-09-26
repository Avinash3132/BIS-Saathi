const fs = require("fs");
const path = require("path");
const Certificate = require("../models/Certificate");
const { dbIsConnected } = require("../config/db");
const { getIntegrityProof, computeHash } = require("../services/blockchainService");

const DEMO_CERTS_PATH = path.join(__dirname, "..", "..", "..", "shared", "demoCertificates.json");
const DEMO_CERTIFICATES = JSON.parse(fs.readFileSync(DEMO_CERTS_PATH, "utf-8")).map((c) => ({
  ...c,
  dataHash: computeHash(c),
  isDemoData: true,
}));

async function findCertificate(certificateId) {
  if (dbIsConnected()) {
    const doc = await Certificate.findOne({ certificateId }).lean();
    if (doc) return doc;
  }
  // DEMO_MODE fallback (or DB simply has no seeded data yet)
  return DEMO_CERTIFICATES.find((c) => c.certificateId.toLowerCase() === certificateId.toLowerCase()) || null;
}

async function listCertificates(req, res, next) {
  try {
    const certs = dbIsConnected() ? await Certificate.find().lean() : DEMO_CERTIFICATES;
    res.json({ certificates: certs, count: certs.length, isDemoData: true });
  } catch (err) {
    next(err);
  }
}

async function verifyCertificate(req, res, next) {
  try {
    const id = req.params.id || req.body.certificateId;
    const cert = await findCertificate(id);

    if (!cert) {
      return res.status(404).json({
        found: false,
        error: "No certificate found with that ID in the demo dataset.",
      });
    }

    const proof = await getIntegrityProof(cert);

    res.json({
      found: true,
      isDemoData: true,
      certificate: {
        certificateId: cert.certificateId,
        product: cert.product,
        manufacturer: cert.manufacturer,
        isNumber: cert.isNumber,
        issueDate: cert.issueDate,
        expiryDate: cert.expiryDate,
        status: cert.status,
      },
      blockchainProof: proof,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { listCertificates, verifyCertificate, findCertificate, DEMO_CERTIFICATES };
