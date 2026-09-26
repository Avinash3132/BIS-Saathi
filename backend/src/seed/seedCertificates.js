require("dotenv").config();

const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Certificate = require("../models/Certificate");
const { computeHash } = require("../services/blockchainService");

const DEMO_CERTS_PATH = path.join(__dirname, "..", "..", "..", "shared", "demoCertificates.json");

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not set — cannot seed MongoDB. Set it in backend/.env.");
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log("[seed] Connected to MongoDB");

  const certificates = JSON.parse(fs.readFileSync(DEMO_CERTS_PATH, "utf-8"));

  await Certificate.deleteMany({});
  const docs = certificates.map((c) => ({ ...c, dataHash: computeHash(c), isDemoData: true }));
  await Certificate.insertMany(docs);

  console.log(`[seed] Inserted ${docs.length} synthetic demo certificates.`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("[seed] Failed:", err);
  process.exit(1);
});
