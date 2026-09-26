const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

/**
 * Loads the deployed CertificateRegistry contract, if one is configured.
 * Returns null (rather than throwing) when the blockchain isn't reachable —
 * the rest of the app is expected to fall back to demo/mock proof data.
 */
function loadContract() {
  const rpcUrl = process.env.RPC_URL;
  const contractAddress = process.env.CONTRACT_ADDRESS;
  const privateKey = process.env.PRIVATE_KEY;

  if (!rpcUrl || !contractAddress || !privateKey) {
    return null;
  }

  // Prefer the ABI written by blockchain/scripts/deploy.js; fall back to a
  // minimal inline ABI covering the methods this service actually calls.
  let abi;
  const deployedArtifactPath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "blockchain",
    "deployed",
    "CertificateRegistry.json"
  );

  if (fs.existsSync(deployedArtifactPath)) {
    abi = JSON.parse(fs.readFileSync(deployedArtifactPath, "utf-8")).abi;
  } else {
    abi = [
      "function getCertificate(string certificateId) view returns (bytes32 dataHash, uint8 status, uint256 recordedAt, address recordedBy, bool exists)",
      "function verifyHash(string certificateId, bytes32 dataHash) view returns (bool)",
    ];
  }

  try {
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);
    return new ethers.Contract(contractAddress, abi, wallet);
  } catch (err) {
    console.warn("[blockchain] Could not initialise contract client:", err.message);
    return null;
  }
}

module.exports = { loadContract };
