import hre from "hardhat";
import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STATUS_MAP = {
  VALID: 1,
  EXPIRED: 2,
  INVALID: 3,
};

function canonicalHash(cert) {
  // Deterministic hash of the fields that matter for integrity.
  const payload = JSON.stringify({
    certificateId: cert.certificateId,
    isNumber: cert.isNumber,
    manufacturer: cert.manufacturer,
    issueDate: cert.issueDate,
    expiryDate: cert.expiryDate,
    status: cert.status,
  });

  return ethers.keccak256(ethers.toUtf8Bytes(payload));
}

async function main() {
  const deployedPath = path.join(
    __dirname,
    "..",
    "deployed",
    "CertificateRegistry.json"
  );

  if (!fs.existsSync(deployedPath)) {
    throw new Error("No deployment found. Run `npm run deploy` first.");
  }

  const { address, abi } = JSON.parse(
    fs.readFileSync(deployedPath, "utf-8")
  );

  // Connect directly to the local Hardhat node.
  const rpcUrl =
    process.env.RPC_URL || "http://127.0.0.1:8545";

  const provider = new ethers.JsonRpcProvider(rpcUrl);

  const accounts = await provider.listAccounts();

  if (accounts.length === 0) {
    throw new Error("No accounts found on the Hardhat node.");
  }

  const signer = await provider.getSigner(accounts[0].address);

  console.log("Seeding from:", accounts[0].address);
  console.log("Contract:", address);

  const registry = new ethers.Contract(
    address,
    abi,
    signer
  );

  const certificatesPath = path.join(
    __dirname,
    "..",
    "..",
    "shared",
    "demoCertificates.json"
  );

  if (!fs.existsSync(certificatesPath)) {
    throw new Error(
      `Demo certificates file not found: ${certificatesPath}`
    );
  }

  const certificates = JSON.parse(
    fs.readFileSync(certificatesPath, "utf-8")
  );

  for (const cert of certificates) {
    const hash = canonicalHash(cert);
    const status = STATUS_MAP[cert.status] ?? 0;

    try {
      const tx = await registry.registerCertificate(
        cert.certificateId,
        hash,
        status
      );

      await tx.wait();

      console.log(
        `Registered ${cert.certificateId} — status ${cert.status} — tx ${tx.hash}`
      );
    } catch (err) {
      console.warn(
        `Skipped ${cert.certificateId}: ${
          err.reason || err.message
        }`
      );
    }
  }

  console.log("Seeding complete.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});