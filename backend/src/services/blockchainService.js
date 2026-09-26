const crypto = require("crypto");
const { ethers } = require("ethers");
const { loadContract } = require("../config/blockchain");

const STATUS_TO_ENUM = { VALID: 1, EXPIRED: 2, INVALID: 3 };
const ENUM_TO_STATUS = { 0: "UNKNOWN", 1: "VALID", 2: "EXPIRED", 3: "INVALID" };
const DEMO_MODE = process.env.DEMO_MODE === "true";

/** Canonical payload used for hashing — must match blockchain/scripts/seedCertificates.js */
function canonicalPayload(cert) {
  return JSON.stringify({
    certificateId: cert.certificateId,
    isNumber: cert.isNumber,
    manufacturer: cert.manufacturer,
    issueDate: cert.issueDate,
    expiryDate: cert.expiryDate,
    status: cert.status,
  });
}

function computeHash(cert) {
  return ethers.keccak256(
    ethers.toUtf8Bytes(canonicalPayload(cert))
  );
}

/** Deterministic, clearly-fake tx hash used only when no live chain is configured. */
function simulatedTxHash(certificateId) {
  return "0x" + crypto.createHash("sha256").update(`tx-${certificateId}`).digest("hex").slice(0, 40);
}

/**
 * Returns an integrity proof for a certificate. Tries the live contract
 * first; falls back to a deterministic simulated proof in DEMO_MODE so the
 * verification screen never breaks because Hardhat isn't running.
 */
async function getIntegrityProof(cert) {
  const dataHash = computeHash(cert);
  const contract = loadContract();

  if (contract) {
    try {
      const keccakHash = ethers.keccak256(ethers.toUtf8Bytes(canonicalPayload(cert)));
      const [onChainHash, statusEnum, recordedAt, , exists] = await contract.getCertificate(cert.certificateId);

      if (!exists) {
        return {
          verified: false,
          network: "live",
          hash: dataHash,
          txHash: null,
          note: "No matching record found on-chain for this certificate id.",
        };
      }

      const matches = onChainHash.toLowerCase() === keccakHash.toLowerCase();
      return {
        verified: matches,
        network: "Hardhat local node (live)",
        hash: dataHash,
        onChainHash: keccakHash,
        onChainStatus: ENUM_TO_STATUS[Number(statusEnum)],
        recordedAt: new Date(Number(recordedAt) * 1000).toISOString(),
        txHash: null, // registration tx hash isn't stored on-chain; see deploy/seed logs
      };
    } catch (err) {
      console.warn(`[blockchainService] Live contract call failed (${err.message}); using simulated proof.`);
    }
  }

  if (!DEMO_MODE) {
    throw new Error("Blockchain node is unavailable and DEMO_MODE is disabled.");
  }

  return {
    verified: cert.status !== "INVALID",
    network: "Local Hardhat demo network (simulated)",
    hash: dataHash,
    txHash: simulatedTxHash(cert.certificateId),
    note: "Simulated proof — no live blockchain node is configured for this deployment.",
  };
}

module.exports = { getIntegrityProof, computeHash, STATUS_TO_ENUM };
