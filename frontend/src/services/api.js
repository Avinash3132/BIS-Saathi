import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

export async function askAssistant(question, language) {
  const { data } = await client.post("/assistant/ask", { question, language });
  return data;
}

export async function explainSimply(question, language, isNumber) {
  const { data } = await client.post("/assistant/explain-simply", { question, language, isNumber });
  return data;
}

export async function verifyCertificate(certificateId) {
  const { data } = await client.get(`/certificates/${encodeURIComponent(certificateId)}/verify`);
  return data;
}

export async function listCertificates() {
  const { data } = await client.get("/certificates");
  return data;
}

export async function getCertificateQr(certificateId) {
  const { data } = await client.get(`/qr/${encodeURIComponent(certificateId)}`);
  return data;
}

export default client;
