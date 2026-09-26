const mongoose = require("mongoose");

/**
 * Certificate — a SYNTHETIC demo record for the BIS-Saathi prototype.
 * These are not real BIS certificates; every response that includes this
 * data must be labelled as demo data by the API/UI layer.
 */
const CertificateSchema = new mongoose.Schema(
  {
    certificateId: { type: String, required: true, unique: true, index: true },
    product: {
      en: { type: String, required: true },
      hi: { type: String, required: true },
    },
    manufacturer: { type: String, required: true },
    isNumber: { type: String, required: true },
    issueDate: { type: String, required: true },
    expiryDate: { type: String, required: true },
    status: { type: String, enum: ["VALID", "EXPIRED", "INVALID"], required: true },
    dataHash: { type: String, required: true },
    isDemoData: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Certificate", CertificateSchema);
