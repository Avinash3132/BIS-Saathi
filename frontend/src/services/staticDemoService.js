/**
 * Local, deterministic replacement for the former Express / FastAPI / blockchain
 * backend. Every function here reads from hardcoded data in
 * ../data/staticResponses.js — nothing touches the network.
 *
 * The response shapes are identical to what the backend used to return, so the
 * pages render exactly as before.
 *
 * The small `delay()` calls only keep the existing "thinking…", "verifying…" and
 * "loading…" UI states visible; they are not simulating network latency anywhere
 * the UI has no loading state.
 */

import {
  STATIC_KNOWLEDGE_BASE,
  NOT_FOUND_TEXT,
  STATIC_CERTIFICATES,
  DEMO_LEDGER_NETWORK,
  DEMO_LEDGER_NOTE,
} from "../data/staticResponses.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const normLang = (language) => (language === "hi" ? "hi" : "en");

// ─── Standards Assistant ──────────────────────────────────────────────────────

/** Transparent keyword-overlap retriever over the demo knowledge base. */
function retrieveDoc(question) {
  const q = String(question || "").toLowerCase();
  let best = null;
  let bestScore = 0;
  for (const doc of STATIC_KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of doc.keywords) {
      if (q.includes(kw.toLowerCase())) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = doc;
    }
  }
  return bestScore > 0 ? best : null;
}

/** Synchronous core: question + language -> assistant response object. */
export function getStaticAssistantResponse(question, language = "en") {
  const lang = normLang(language);
  const doc = retrieveDoc(question);

  if (!doc) {
    return {
      answer: NOT_FOUND_TEXT[lang],
      grounded: false,
      isNumber: null,
      simpleExplanation: null,
      relevantTo: null,
      sources: [],
    };
  }

  return {
    answer: doc.answer[lang],
    grounded: true,
    isNumber: doc.isNumber,
    simpleExplanation: doc.simple[lang],
    relevantTo: doc.relevantTo[lang],
    sources: [
      {
        document: doc.title[lang],
        sourceFile: doc.sourceFile,
        page: doc.page,
        clause: doc.clause,
      },
    ],
  };
}

/** Async wrapper that keeps the "thinking…" state visible briefly. */
export async function askStaticAssistant(question, language) {
  await delay(700);
  return getStaticAssistantResponse(question, language);
}

/**
 * "Explain simply" — prefers the standard the user is already looking at
 * (isNumber) and falls back to retrieving from the question text.
 */
export async function explainStaticSimply(question, language, isNumber) {
  await delay(300);
  const lang = normLang(language);
  const doc =
    (isNumber && STATIC_KNOWLEDGE_BASE.find((d) => d.isNumber === isNumber)) ||
    retrieveDoc(question);
  return { simpleExplanation: doc ? doc.simple[lang] : null };
}

// ─── Certificates & integrity proof ───────────────────────────────────────────

/** Fixed demo integrity record. No chain is queried; values are precomputed. */
function buildProof(cert) {
  return {
    verified: cert.status !== "INVALID",
    network: DEMO_LEDGER_NETWORK,
    hash: cert.certificateHash,
    txHash: cert.transactionRecord,
    note: DEMO_LEDGER_NOTE,
  };
}

function findCertificate(certificateId) {
  const id = String(certificateId || "").trim().toLowerCase();
  return STATIC_CERTIFICATES.find((c) => c.certificateId.toLowerCase() === id) || null;
}

/** All demo certificates (used by "Try a demo" and the simulated QR scan). */
export function listStaticCertificates() {
  return {
    certificates: STATIC_CERTIFICATES.map((c) => ({ ...c, isDemoData: true })),
    count: STATIC_CERTIFICATES.length,
    isDemoData: true,
  };
}

/** Returns the verification result, or null when the ID isn't in the demo set. */
export async function verifyStaticCertificate(certificateId) {
  await delay(600);
  const cert = findCertificate(certificateId);
  if (!cert) return null;

  return {
    found: true,
    isDemoData: true,
    certificate: {
      certificateId: cert.certificateId,
      product: cert.product,
      manufacturer: cert.manufacturer,
      isNumber: cert.isNumber,
      issueDate: cert.issueDate,
      expiryDate: cert.expiryDate,
      status: cert.status,
    },
    blockchainProof: buildProof(cert),
  };
}

// ─── QR code ──────────────────────────────────────────────────────────────────

/**
 * Generates the certificate QR entirely in the browser (same `qrcode` library and
 * options the backend used). It encodes this deployment's own /certificate/:id URL.
 * Returns null for unknown IDs.
 */
export async function getStaticQr(certificateId) {
  const cert = findCertificate(certificateId);
  if (!cert) return null;

  const { default: QRCode } = await import("qrcode");
  const encodedUrl = `${window.location.origin}/certificate/${cert.certificateId}`;
  const qrDataUrl = await QRCode.toDataURL(encodedUrl, {
    errorCorrectionLevel: "M",
    margin: 2,
    width: 320,
  });
  return { certificateId: cert.certificateId, qrDataUrl, encodedUrl };
}
