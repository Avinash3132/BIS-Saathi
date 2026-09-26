const express = require("express");
const { listCertificates, verifyCertificate } = require("../controllers/certificateController");
const { validateCertificateId } = require("../middleware/validate");

const router = express.Router();

router.get("/", listCertificates);
router.get("/:id/verify", validateCertificateId, verifyCertificate);
router.post("/verify", validateCertificateId, verifyCertificate);

module.exports = router;
