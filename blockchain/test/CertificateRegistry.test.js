import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("CertificateRegistry", function () {
  let registry, owner, other;

  beforeEach(async function () {
    [owner, other] = await ethers.getSigners();
    registry = await ethers.deployContract("CertificateRegistry");
  });

  it("registers a certificate and returns it correctly", async function () {
    const hash = ethers.keccak256(ethers.toUtf8Bytes("BIS-DEMO-001|demo-payload"));
    await registry.registerCertificate("BIS-DEMO-001", hash, 1); // 1 = Valid

    const [dataHash, status, , , exists] = await registry.getCertificate("BIS-DEMO-001");
    expect(exists).to.equal(true);
    expect(status).to.equal(1n);
    expect(dataHash).to.equal(hash);
  });

  it("verifies a matching hash and rejects a mismatched one", async function () {
    const hash = ethers.keccak256(ethers.toUtf8Bytes("BIS-DEMO-002|demo-payload"));
    await registry.registerCertificate("BIS-DEMO-002", hash, 1);

    expect(await registry.verifyHash("BIS-DEMO-002", hash)).to.equal(true);

    const wrongHash = ethers.keccak256(ethers.toUtf8Bytes("tampered"));
    expect(await registry.verifyHash("BIS-DEMO-002", wrongHash)).to.equal(false);
  });

  it("prevents non-owners from registering certificates", async function () {
    const hash = ethers.keccak256(ethers.toUtf8Bytes("BIS-DEMO-003|demo-payload"));
    await expect(
      registry.connect(other).registerCertificate("BIS-DEMO-003", hash, 1)
    ).to.be.revertedWith("CertificateRegistry: caller is not the owner");
  });

  it("prevents duplicate registration of the same certificate id", async function () {
    const hash = ethers.keccak256(ethers.toUtf8Bytes("BIS-DEMO-004|demo-payload"));
    await registry.registerCertificate("BIS-DEMO-004", hash, 1);
    await expect(
      registry.registerCertificate("BIS-DEMO-004", hash, 1)
    ).to.be.revertedWith("CertificateRegistry: certificate already registered");
  });

  it("allows the owner to update certificate status", async function () {
    const hash = ethers.keccak256(ethers.toUtf8Bytes("BIS-DEMO-005|demo-payload"));
    await registry.registerCertificate("BIS-DEMO-005", hash, 1);
    await registry.updateStatus("BIS-DEMO-005", 2); // -> Expired

    const [, status] = await registry.getCertificate("BIS-DEMO-005");
    expect(status).to.equal(2n);
  });
});
