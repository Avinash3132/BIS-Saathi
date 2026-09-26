import hre from "hardhat";
import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const rpcUrl = process.env.RPC_URL || "http://127.0.0.1:8545";

  // Connect directly to the local Hardhat node
  const provider = new ethers.JsonRpcProvider(rpcUrl);

  // Get the accounts available on the local Hardhat node
  const accounts = await provider.listAccounts();

  if (accounts.length === 0) {
    throw new Error("No accounts found on the Hardhat node.");
  }

  const signer = await provider.getSigner(accounts[0].address);

  console.log("Deploying from:", accounts[0].address);

  // Read compiled contract artifact
  const artifact = await hre.artifacts.readArtifact("CertificateRegistry");

  // Create contract factory using ABI + bytecode
  const CertificateRegistry = new ethers.ContractFactory(
    artifact.abi,
    artifact.bytecode,
    signer
  );

  // Deploy
  const registry = await CertificateRegistry.deploy();

  await registry.waitForDeployment();

  const address = await registry.getAddress();

  console.log("CertificateRegistry deployed to:", address);

  // Write deployment information for the backend
  const outDir = path.join(__dirname, "..", "deployed");

  fs.mkdirSync(outDir, { recursive: true });

  fs.writeFileSync(
    path.join(outDir, "CertificateRegistry.json"),
    JSON.stringify(
      {
        address,
        abi: artifact.abi,
      },
      null,
      2
    )
  );

  console.log(
    "Wrote deployment info to blockchain/deployed/CertificateRegistry.json"
  );

  console.log(
    "Copy this address into backend/.env as CONTRACT_ADDRESS"
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});