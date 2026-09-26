import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck, QrCode, Search, ScanLine, Link2, BadgeCheck, XCircle,
  Gem, AlertTriangle, X, Upload, CheckCircle2
} from "lucide-react";
import { DemoBadge, StatusPill, Spinner, DemoQrPattern } from "../components/UiKit.jsx";
import { verifyCertificate, listCertificates } from "../services/api.js";
import { DEMO_HUIDS, generateComplaintId, PRODUCT_CATEGORIES } from "../data/demoData.js";

const KNOWN_DEMO_IDS = Array.from({ length: 10 }, (_, i) => `BIS-DEMO-${String(i + 1).padStart(3, "0")}`);

const TABS = [
  { id: "isi", label: "ISI / CML Verification", icon: ShieldCheck },
  { id: "huid", label: "HUID Gold Verification", icon: Gem },
];

// ─── HUID Verification Panel ───────────────────────────────────────────────────
function HuidPanel({ t }) {
  const [huidInput, setHuidInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function verify() {
    const val = huidInput.trim().toUpperCase();
    if (!val || val.length !== 6 || !/^[A-Z0-9]{6}$/.test(val)) {
      setError(t.huidInvalid);
      setResult(null);
      return;
    }
    setError(null);
    setResult(null);
    setLoading(true);
    setTimeout(() => {
      const found = DEMO_HUIDS.find((h) => h.huid === val);
      setResult(found || { huid: val, status: "NOT_FOUND" });
      setLoading(false);
    }, 900);
  }

  const isVerified = result?.status === "VERIFIED";
  const isNotFound = result?.status === "NOT_FOUND";

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-slate-200 bg-white/80 p-6">
        <h2 className="font-serif text-xl font-semibold text-slate-900">{t.huidTitle}</h2>
        <p className="mt-1 text-sm text-slate-500">{t.huidSub}</p>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <input
            value={huidInput}
            onChange={(e) => { setHuidInput(e.target.value.toUpperCase()); setError(null); }}
            onKeyDown={(e) => e.key === "Enter" && verify()}
            placeholder={t.huidPlaceholder}
            maxLength={6}
            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 font-mono text-lg font-bold uppercase tracking-widest text-slate-800 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all placeholder:font-sans placeholder:text-base placeholder:font-normal placeholder:tracking-normal placeholder:text-slate-400"
          />
          <button
            onClick={verify}
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl bg-amber-600 px-5 py-3 text-sm font-semibold text-white hover:bg-amber-700 disabled:opacity-60 transition-colors"
          >
            {loading ? <Spinner className="h-4 w-4 text-white" /> : <Gem className="h-4 w-4" />}
            {t.huidVerify}
          </button>
        </div>

        {error && (
          <p className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
            <XCircle className="h-4 w-4" /> {error}
          </p>
        )}

        <div className="mt-3 flex flex-wrap gap-2">
          {["AB1234", "CD5678", "EF9012"].map((demo) => (
            <button
              key={demo}
              onClick={() => { setHuidInput(demo); setError(null); setResult(null); }}
              className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-1 font-mono text-xs font-semibold text-amber-700 hover:bg-amber-100 transition-colors"
            >
              {demo}
            </button>
          ))}
          <button
            onClick={() => { setHuidInput("XX9999"); setError(null); setResult(null); }}
            className="rounded-lg border border-red-200 bg-red-50 px-3 py-1 font-mono text-xs font-semibold text-red-600 hover:bg-red-100 transition-colors"
          >
            XX9999 (Not Found)
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Spinner /> Checking HUID in demo registry…
        </div>
      )}

      {result && !loading && isNotFound && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
          <div className="flex items-center gap-2 text-red-700 font-semibold">
            <XCircle className="h-5 w-5" />
            {t.statusNotFound}
          </div>
          <p className="mt-2 text-sm text-red-600">{t.huidNotFound}</p>
        </div>
      )}

      {result && !loading && isVerified && (
        <div className="rounded-2xl border border-emerald-200 bg-white/80 p-6 space-y-4 fade-in">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">HUID</p>
              <p className="font-mono text-2xl font-bold text-slate-900">{result.huid}</p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2">
              <BadgeCheck className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-bold text-emerald-700">{t.statusVerified}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              [t.huidPurity, result.purityLabel, "font-bold text-amber-700"],
              [t.huidCentre, result.hallmarkingCentre],
              [t.huidArticle, result.articleType],
              [t.huidWeight, result.weight],
              [t.huidDate, result.hallmarkDate],
              [t.huidJeweller, result.jeweller],
            ].map(([label, val, extraCls = ""]) => (
              <div key={label} className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</p>
                <p className={`mt-0.5 text-sm font-medium text-slate-800 ${extraCls}`}>{val}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-amber-100 bg-amber-50 p-3 text-xs text-amber-700">
            <strong>DEMO RECORD — </strong>This is synthetic demo data for the SIH26107 prototype. No real BIS HUID registry is connected.
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Complaint Modal ───────────────────────────────────────────────────────────
function ComplaintModal({ onClose, t, lang }) {
  const [form, setForm] = useState({ product: "", category: "", shop: "", description: "", photo: null });
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.product || !form.category || !form.description) return;
    setRefId(generateComplaintId());
    setSubmitted(true);
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    setForm((f) => ({ ...f, photo: file ? file.name : null }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <h2 className="font-serif text-lg font-semibold text-slate-900">{t.reportFake}</h2>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            <p className="text-sm text-slate-500">{t.reportFakeSub}</p>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Product Name *</label>
              <input
                required value={form.product}
                onChange={(e) => setForm((f) => ({ ...f, product: e.target.value }))}
                placeholder="e.g. Motorcycle Helmet — Brand XYZ"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Product Category *</label>
              <select
                required value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 bg-white transition-all"
              >
                <option value="">Select category…</option>
                {PRODUCT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Shop / Seller Details</label>
              <input
                value={form.shop}
                onChange={(e) => setForm((f) => ({ ...f, shop: e.target.value }))}
                placeholder="Shop name, address, or marketplace URL"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Description of Issue *</label>
              <textarea
                required rows={3} value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Describe how you identified the product as fake or substandard…"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 resize-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Photo Evidence (optional)</label>
              <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-500 hover:border-red-300 hover:bg-red-50/30 transition-all">
                <Upload className="h-4 w-4" />
                {form.photo ? <span className="text-emerald-600 font-medium">{form.photo}</span> : "Click to attach a photo"}
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
            </div>

            <div className="rounded-xl border border-amber-100 bg-amber-50 p-3 text-xs text-amber-700">
              {t.reportDisclaimer}
            </div>

            <div className="flex gap-3 pt-1">
              <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                Cancel
              </button>
              <button type="submit" className="flex-1 rounded-xl bg-red-600 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition-colors">
                {t.reportSubmit}
              </button>
            </div>
          </form>
        ) : (
          <div className="px-6 py-8 text-center space-y-4">
            <div className="flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                <CheckCircle2 className="h-8 w-8 text-emerald-600" />
              </div>
            </div>
            <h3 className="font-serif text-xl font-semibold text-slate-900">{t.reportSuccess}</h3>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-1">{t.reportRef}</p>
              <p className="font-mono text-lg font-bold text-emerald-800">{refId}</p>
            </div>
            <p className="text-sm text-slate-500">
              Your complaint has been recorded in the demo system. In production, this would be routed to the BIS Regional Office for enforcement action.
            </p>
            <p className="text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-lg p-2">{t.reportDisclaimer}</p>
            <button onClick={onClose} className="mt-2 w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 transition-colors">
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Verify Page ──────────────────────────────────────────────────────────
export default function Verify({ t, lang }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("isi");
  const [certId, setCertId] = useState("");
  const [scanning, setScanning] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [qrSeed, setQrSeed] = useState("BIS-DEMO-001");
  const [allCerts, setAllCerts] = useState([]);
  const [showComplaint, setShowComplaint] = useState(false);

  useEffect(() => {
    listCertificates()
      .then((data) => setAllCerts(data.certificates || []))
      .catch(() => setAllCerts([]));
  }, []);

  async function verify(id) {
    setNotFound(false);
    setResult(null);
    setVerifying(true);
    try {
      const data = await verifyCertificate(id);
      setResult(data);
    } catch (err) {
      if (err.response?.status === 404) setNotFound(true);
      else { console.error(err); setNotFound(true); }
    } finally {
      setVerifying(false);
    }
  }

  function simulateScan() {
    setScanning(true);
    setResult(null);
    setNotFound(false);
    const ids = allCerts.length ? allCerts.map((c) => c.certificateId) : KNOWN_DEMO_IDS;
    const id = ids[Math.floor(Math.random() * ids.length)];
    setQrSeed(id);
    setTimeout(() => { setScanning(false); setCertId(id); verify(id); }, 1200);
  }

  function tryDemo() {
    const valids = (allCerts.length ? allCerts : []).filter((c) => c.status === "VALID");
    const id = valids.length ? valids[Math.floor(Math.random() * valids.length)].certificateId : "BIS-DEMO-001";
    setCertId(id);
    verify(id);
  }

  const cert = result?.certificate;
  const proof = result?.blockchainProof;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-5">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck className="h-5 w-5 text-blue-900" />
          <h1 className="font-serif text-2xl font-semibold text-slate-900">{t.verifyTitle}</h1>
        </div>
        <div className="mt-3">
          <DemoBadge text={t.demoBadge} />
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex items-center gap-1 rounded-xl border border-slate-200 bg-white/80 p-1">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-blue-900 text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ISI/CML Tab */}
      {activeTab === "isi" && (
        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-6">
            <div className="flex flex-col items-center gap-4 border-b border-slate-100 pb-6 text-center sm:flex-row sm:justify-between sm:text-left">
              <div className="flex items-center gap-4">
                {scanning ? (
                  <div className="flex h-28 w-28 items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50">
                    <ScanLine className="h-8 w-8 animate-pulse text-blue-500" />
                  </div>
                ) : (
                  <DemoQrPattern seed={qrSeed} />
                )}
                <div>
                  <p className="text-sm font-medium text-slate-700">{scanning ? t.scanning : "Demo QR"}</p>
                  <button
                    onClick={simulateScan}
                    disabled={scanning}
                    className="mt-2 flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <QrCode className="h-3.5 w-3.5" /> {t.scanQr}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && verify(certId)}
                  placeholder={t.enterIdPlaceholder}
                  className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                />
                <button
                  onClick={() => verify(certId)}
                  disabled={verifying || !certId.trim()}
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60 transition-colors"
                >
                  {verifying ? <Spinner className="h-4 w-4 text-white" /> : <Search className="h-4 w-4" />}
                  {t.verifyAction}
                </button>
              </div>
              <button onClick={tryDemo} className="mt-2 text-xs font-semibold text-blue-900 hover:underline underline-offset-2">
                {t.tryDemo}
              </button>
            </div>
          </div>

          {verifying && (
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Spinner /> {t.verifying}
            </div>
          )}

          {notFound && !verifying && (
            <div className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <XCircle className="h-4 w-4 flex-shrink-0" /> {t.notFoundCert}
            </div>
          )}

          {cert && proof && (
            <div className="space-y-4 fade-in">
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-6">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">{t.demoCertLabel}</p>
                  <button
                    onClick={() => navigate(`/certificate/${cert.certificateId}`)}
                    className="text-xs font-semibold text-blue-900 hover:underline underline-offset-2"
                  >
                    {t.viewQr}
                  </button>
                </div>
                <div className="mt-3">
                  <StatusPill status={cert.status} t={t} />
                </div>
                <dl className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
                  {[
                    [t.certId, cert.certificateId],
                    [t.product, cert.product?.[lang] || cert.product?.en],
                    [t.standard, cert.isNumber],
                    [t.licensee, cert.manufacturer],
                    [t.validity, `${cert.issueDate} – ${cert.expiryDate}`],
                  ].map(([label, val]) => (
                    <div key={label} className="rounded-xl bg-slate-50 p-3">
                      <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</dt>
                      <dd className="mt-0.5 font-medium text-slate-800">{val}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Consumer-facing simplified integrity */}
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-5">
                <div className="flex items-center gap-2">
                  <Link2 className="h-4 w-4 text-blue-900" />
                  <h3 className="font-serif text-base font-semibold text-slate-900">Certificate Integrity</h3>
                </div>
                <div className={`mt-3 flex items-center gap-2 text-sm font-semibold ${proof.verified ? "text-emerald-600" : "text-red-600"}`}>
                  {proof.verified ? <BadgeCheck className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  {proof.verified ? t.integrityVerified : t.integrityBroken}
                </div>
                <p className="mt-3 rounded-xl bg-slate-50 p-3 text-xs text-slate-500">{t.blockchainDisclaimer}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* HUID Tab */}
      {activeTab === "huid" && <HuidPanel t={t} />}

      {/* Report CTA */}
      <div className="mt-8 rounded-2xl border border-red-100 bg-gradient-to-r from-red-50 to-orange-50 p-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <h3 className="font-semibold text-red-900">{t.reportFake}</h3>
            </div>
            <p className="mt-1 text-xs text-red-700">{t.reportFakeSub}</p>
          </div>
          <button
            onClick={() => setShowComplaint(true)}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors flex-shrink-0"
          >
            <AlertTriangle className="h-4 w-4" />
            Report Now
          </button>
        </div>
      </div>

      {showComplaint && (
        <ComplaintModal onClose={() => setShowComplaint(false)} t={t} lang={lang} />
      )}
    </div>
  );
}
