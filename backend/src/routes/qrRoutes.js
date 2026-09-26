const express = require("express");
const { getCertificateQr } = require("../controllers/qrController");
const { validateCertificateId } = require("../middleware/validate");

const router = express.Router();

router.get("/:id", validateCertificateId, getCertificateQr);

module.exports = router;
