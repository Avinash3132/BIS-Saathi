// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title CertificateRegistry
/// @notice DEMO smart contract for the BIS-Saathi SIH prototype (SIH26107).
/// @dev Stores a hash + status pointer for synthetic demo certificates so the
///      prototype can show an on-chain integrity check during verification.
///      IMPORTANT: this contract proves the integrity of data recorded here.
///      It does NOT verify, and must never be presented as verifying, that a
///      certificate was genuinely issued by BIS. This is a demonstration of
///      the *trust layer concept* only, using synthetic data.
contract CertificateRegistry {
    enum Status {
        Unknown,
        Valid,
        Expired,
        Invalid
    }

    struct CertificateRecord {
        string certificateId;
        bytes32 dataHash;
        Status status;
        uint256 recordedAt;
        address recordedBy;
        bool exists;
    }

    address public owner;
    mapping(string => CertificateRecord) private records;
    string[] private certificateIds;

    event CertificateRegistered(string indexed certificateId, bytes32 dataHash, Status status);
    event CertificateStatusUpdated(string indexed certificateId, Status newStatus);

    modifier onlyOwner() {
        require(msg.sender == owner, "CertificateRegistry: caller is not the owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /// @notice Register a new demo certificate record.
    function registerCertificate(
        string calldata certificateId,
        bytes32 dataHash,
        Status status
    ) external onlyOwner {
        require(bytes(certificateId).length > 0, "CertificateRegistry: empty certificate id");
        require(!records[certificateId].exists, "CertificateRegistry: certificate already registered");

        records[certificateId] = CertificateRecord({
            certificateId: certificateId,
            dataHash: dataHash,
            status: status,
            recordedAt: block.timestamp,
            recordedBy: msg.sender,
            exists: true
        });
        certificateIds.push(certificateId);

        emit CertificateRegistered(certificateId, dataHash, status);
    }

    /// @notice Update the status of an existing demo certificate (e.g. VALID -> EXPIRED).
    function updateStatus(string calldata certificateId, Status newStatus) external onlyOwner {
        require(records[certificateId].exists, "CertificateRegistry: certificate not found");
        records[certificateId].status = newStatus;
        emit CertificateStatusUpdated(certificateId, newStatus);
    }

    /// @notice Look up a certificate record by id.
    function getCertificate(string calldata certificateId)
        external
        view
        returns (
            bytes32 dataHash,
            Status status,
            uint256 recordedAt,
            address recordedBy,
            bool exists
        )
    {
        CertificateRecord memory rec = records[certificateId];
        return (rec.dataHash, rec.status, rec.recordedAt, rec.recordedBy, rec.exists);
    }

    /// @notice Verify that a given off-chain hash matches what was recorded on-chain.
    function verifyHash(string calldata certificateId, bytes32 dataHash) external view returns (bool matches) {
        CertificateRecord memory rec = records[certificateId];
        if (!rec.exists) return false;
        return rec.dataHash == dataHash;
    }

    function totalCertificates() external view returns (uint256) {
        return certificateIds.length;
    }

    function certificateIdAt(uint256 index) external view returns (string memory) {
        require(index < certificateIds.length, "CertificateRegistry: index out of range");
        return certificateIds[index];
    }
}
