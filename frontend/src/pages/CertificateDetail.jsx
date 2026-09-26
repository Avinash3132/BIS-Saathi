import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { DemoBadge, StatusPill, Spinner } from "../components/UiKit.jsx";
import { verifyCertificate, getCertificateQr } from "../services/api.js";

export default function CertificateDetail({ t, lang }) {
  const { id } = useParams();
  const [cert, setCert] = useState(null);
  const [qrDataUrl, setQrDataUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    Promise.all([verifyCertificate(id), getCertificateQr(id)])
      .then(([verifyData, qrData]) => {
        setCert(verifyData.certificate);
        setQrDataUrl(qrData.qrDataUrl);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="mx-auto max-w-2xl px-5 py-8">
      <Link to="/verify" className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800">
        <ArrowLeft className="h-4 w-4" /> {t.backHome}
      </Link>

      <div className="mt-4 mb-1 flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-blue-900" />
        <h1 className="font-serif text-2xl font-semibold text-slate-900">{id}</h1>
      </div>
      <DemoBadge text={t.demoBadge} />

      {loading && (
        <div className="mt-8 flex items-center gap-2 text-sm text-slate-400">
          <Spinner /> {t.loadingCert}
        </div>
      )}

      {error && !loading && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {t.notFoundCert}
        </div>
      )}

      {cert && !loading && (
        <div className="mt-6 rounded-xl border border-slate-200 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">{t.demoCertLabel}</p>
          <div className="mt-3">
            <StatusPill status={cert.status} t={t} />
          </div>

          <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            {qrDataUrl && (
              <img src={qrDataUrl} alt={`QR code for ${id}`} className="h-40 w-40 rounded-lg border border-slate-200" />
            )}
            <dl className="grid flex-1 grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
              {[
                [t.certId, cert.certificateId],
                [t.product, cert.product?.[lang] || cert.product?.en],
                [t.standard, cert.isNumber],
                [t.licensee, cert.manufacturer],
                [t.validity, `${cert.issueDate} – ${cert.expiryDate}`],
              ].map(([label, val]) => (
                <div key={label}>
                  <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</dt>
                  <dd className="mt-0.5 font-medium text-slate-800">{val}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}
