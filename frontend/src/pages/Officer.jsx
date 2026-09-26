import React, { useState, useEffect, useRef } from "react";
import {
  Shield, BarChart3, FileSearch, AlertTriangle, CheckCircle2, Clock,
  XCircle, TrendingUp, Users, ChevronRight, Lock, Hash, Layers, Cpu,
  BadgeCheck, Database
} from "lucide-react";
import { DemoBadge } from "../components/UiKit.jsx";
import {
  OFFICER_STATS, OFFICER_TOP_STANDARDS, OFFICER_REGIONAL_COMPLAINTS,
  OFFICER_APPLICATIONS, OFFICER_AUDIT_RECORDS,
} from "../data/demoData.js";

// ─── Animated KPI Card ────────────────────────────────────────────────────────
function KpiCard({ icon: Icon, label, value, sub, color = "blue" }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(value / 30);
    const timer = setInterval(() => {
      start = Math.min(start + step, value);
      setDisplay(start);
      if (start >= value) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, [value]);

  const colorMap = {
    blue: "from-blue-50 to-blue-100/50 text-blue-900 border-blue-200",
    emerald: "from-emerald-50 to-emerald-100/50 text-emerald-900 border-emerald-200",
    violet: "from-violet-50 to-violet-100/50 text-violet-900 border-violet-200",
    amber: "from-amber-50 to-amber-100/50 text-amber-900 border-amber-200",
  };
  const iconMap = {
    blue: "bg-blue-100 text-blue-700",
    emerald: "bg-emerald-100 text-emerald-700",
    violet: "bg-violet-100 text-violet-700",
    amber: "bg-amber-100 text-amber-700",
  };

  return (
    <div className={`card-hover rounded-2xl border bg-gradient-to-br p-5 ${colorMap[color]}`}>
      <div className="flex items-start justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconMap[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <TrendingUp className="h-4 w-4 opacity-40" />
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold count-up">{display.toLocaleString()}</p>
        <p className="mt-0.5 text-sm font-semibold">{label}</p>
        {sub && <p className="mt-0.5 text-xs opacity-70">{sub}</p>}
      </div>
    </div>
  );
}

// ─── Bar Chart (pure CSS/SVG) ─────────────────────────────────────────────────
function BarChart({ data, title }) {
  const max = Math.max(...data.map((d) => d.searches));
  return (
    <div>
      <h3 className="mb-4 font-serif text-base font-semibold text-slate-900">{title}</h3>
      <div className="space-y-2.5">
        {data.map((item, i) => (
          <div key={i} className="group">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-xs font-medium text-slate-600 truncate pr-2" title={item.name}>{item.name}</span>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs font-bold text-slate-800">{item.searches.toLocaleString()}</span>
                <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">{item.trend}</span>
              </div>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-blue-800 to-blue-500 transition-all duration-700"
                style={{ width: `${(item.searches / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Donut Chart (SVG) ────────────────────────────────────────────────────────
function DonutChart({ data, title }) {
  const total = data.reduce((acc, d) => acc + d.count, 0);
  const colors = ["#1e40af", "#7c3aed", "#059669", "#d97706", "#be185d"];
  let offset = 0;
  const R = 50;
  const C = 2 * Math.PI * R;

  const slices = data.map((d, i) => {
    const pct = d.count / total;
    const slice = { ...d, pct, color: colors[i], dasharray: `${pct * C} ${C}`, dashoffset: -offset * C };
    offset += pct;
    return slice;
  });

  return (
    <div>
      <h3 className="mb-4 font-serif text-base font-semibold text-slate-900">{title}</h3>
      <div className="flex items-center gap-6">
        <div className="flex-shrink-0">
          <svg viewBox="0 0 120 120" className="h-32 w-32">
            <circle cx="60" cy="60" r={R} fill="none" stroke="#f1f5f9" strokeWidth="18" />
            {slices.map((s, i) => (
              <circle
                key={i} cx="60" cy="60" r={R} fill="none" stroke={s.color}
                strokeWidth="18" strokeDasharray={s.dasharray}
                strokeDashoffset={s.dashoffset}
                style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
              />
            ))}
            <text x="60" y="60" textAnchor="middle" dominantBaseline="middle" className="text-lg font-bold" fontSize="14" fill="#1e293b">
              {total}
            </text>
            <text x="60" y="72" textAnchor="middle" fontSize="7" fill="#94a3b8">total</text>
          </svg>
        </div>
        <div className="space-y-2 flex-1 min-w-0">
          {slices.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
              <span className="text-xs text-slate-600 truncate flex-1">{s.region}</span>
              <span className="text-xs font-bold text-slate-800 flex-shrink-0">{s.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Application Table ─────────────────────────────────────────────────────────
function ApplicationTable({ applications }) {
  const statusConfig = {
    PENDING: { icon: Clock, cls: "bg-amber-50 text-amber-700 border-amber-200", label: "Pending" },
    IN_REVIEW: { icon: FileSearch, cls: "bg-blue-50 text-blue-700 border-blue-200", label: "In Review" },
    COMPLETED: { icon: CheckCircle2, cls: "bg-emerald-50 text-emerald-700 border-emerald-200", label: "Completed" },
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white/80">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/80">
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">App ID</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Product</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400 hidden sm:table-cell">Manufacturer</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400 hidden md:table-cell">Standard</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {applications.map((app) => {
            const cfg = statusConfig[app.status];
            const Icon = cfg.icon;
            return (
              <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-slate-600">{app.id}</td>
                <td className="px-4 py-3 font-medium text-slate-800">{app.product}</td>
                <td className="px-4 py-3 text-slate-600 hidden sm:table-cell">{app.manufacturer}</td>
                <td className="px-4 py-3 text-slate-500 hidden md:table-cell font-mono text-xs">{app.standard}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${cfg.cls}`}>
                    <Icon className="h-3 w-3" />
                    {cfg.label}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Audit Record Card ─────────────────────────────────────────────────────────
function AuditCard({ record, t }) {
  const [expanded, setExpanded] = useState(false);
  const isVerified = record.integrity === "VERIFIED";

  return (
    <div className={`rounded-2xl border ${isVerified ? "border-slate-200 bg-white/80" : "border-red-200 bg-red-50/30"}`}>
      <button
        className="flex w-full items-center justify-between p-5 text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${isVerified ? "bg-emerald-100" : "bg-red-100"}`}>
            {isVerified ? <BadgeCheck className="h-5 w-5 text-emerald-600" /> : <XCircle className="h-5 w-5 text-red-600" />}
          </div>
          <div className="min-w-0">
            <p className="font-mono text-sm font-semibold text-slate-800">{record.certId}</p>
            <p className="text-xs text-slate-500 truncate">{record.product} — {record.manufacturer}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 ml-2">
          <span className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${isVerified ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-red-200 bg-red-50 text-red-700"}`}>
            {isVerified ? "VERIFIED" : "TAMPERED"}
          </span>
          <ChevronRight className={`h-4 w-4 text-slate-400 transition-transform ${expanded ? "rotate-90" : ""}`} />
        </div>
      </button>

      {expanded && (
        <div className="border-t border-slate-100 px-5 pb-5 pt-4 space-y-3">
          {!isVerified && (
            <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5">
              <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0" />
              <p className="text-xs font-semibold text-red-700">{t.officerTampered}</p>
            </div>
          )}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
            <div>
              <p className="font-semibold uppercase tracking-wider text-slate-400 mb-0.5">{t.officerHash}</p>
              <p className="font-mono break-all text-slate-600">{record.hash}</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-wider text-slate-400 mb-0.5">{t.officerTx}</p>
              <p className="font-mono break-all text-slate-600">{record.txHash}</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-wider text-slate-400 mb-0.5">{t.officerBlock}</p>
              <p className="font-medium text-slate-700">{record.block.toLocaleString()}</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-wider text-slate-400 mb-0.5">{t.officerIssued}</p>
              <p className="font-medium text-slate-700">{record.issuedDate}</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-wider text-slate-400 mb-0.5">Standard</p>
              <p className="font-mono font-semibold text-blue-800">{record.isNumber}</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-wider text-slate-400 mb-0.5">{t.officerVerified}</p>
              <p className="font-medium text-slate-700">{new Date(record.verifiedAt).toLocaleString("en-IN")}</p>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-500">
            <strong>What this means: </strong>
            The blockchain layer provides a tamper-evident record that helps verify whether registered certificate information has been altered since issuance. It does <strong>not</strong> independently prove that the physical product is genuine or that the certificate was originally issued by BIS.
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Section Tabs ─────────────────────────────────────────────────────────────
const TABS = [
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "applications", label: "Applications", icon: FileSearch },
  { id: "audit", label: "Audit Trail", icon: Database },
];

// ─── Main Officer Page ─────────────────────────────────────────────────────────
export default function Officer({ t, lang }) {
  const [activeTab, setActiveTab] = useState("analytics");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Shield className="h-5 w-5 text-violet-700" />
          <h1 className="font-serif text-2xl font-semibold text-slate-900">{t.officerTitle}</h1>
        </div>
        <p className="text-sm text-slate-500">{t.officerSub}</p>
        <div className="mt-3 flex items-center gap-3 flex-wrap">
          <DemoBadge text={t.demoBadge} />
          <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
            <Lock className="h-3 w-3" />
            Elevated Access — Demo Mode
          </span>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
        <KpiCard icon={Users} label="Total Searches" value={OFFICER_STATS.totalSearches} color="blue" />
        <KpiCard icon={CheckCircle2} label="Cert. Verifications" value={OFFICER_STATS.certificateVerifications} color="emerald" />
        <KpiCard icon={AlertTriangle} label="Complaints Filed" value={OFFICER_STATS.complaintSubmissions} color="amber" />
        <KpiCard icon={Cpu} label="AI Queries" value={OFFICER_STATS.aiAssistantQueries} color="violet" />
      </div>

      {/* Tab nav */}
      <div className="mb-6 flex items-center gap-1 rounded-xl border border-slate-200 bg-white/80 p-1">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-violet-900 text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── Analytics Tab ────────────────────────────────────────────── */}
      {activeTab === "analytics" && (
        <div className="space-y-5">
          {/* Application pipeline */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Pending", value: OFFICER_STATS.pendingApplications, color: "text-amber-600", bg: "bg-amber-50 border-amber-200" },
              { label: "In Review", value: OFFICER_STATS.inReviewApplications, color: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
              { label: "Completed", value: OFFICER_STATS.completedApplications, color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" },
            ].map((item) => (
              <div key={item.label} className={`rounded-2xl border ${item.bg} p-4 text-center`}>
                <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                <p className="text-xs font-medium text-slate-600 mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-6">
              <BarChart data={OFFICER_TOP_STANDARDS} title={t.officerTopStandards} />
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-6">
              <DonutChart data={OFFICER_REGIONAL_COMPLAINTS} title={t.officerComplaints} />
            </div>
          </div>

          {/* Verification breakdown */}
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-6">
            <h3 className="font-serif text-base font-semibold text-slate-900 mb-4">Verification Activity Breakdown</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { label: "ISI/CML Verifications", value: OFFICER_STATS.certificateVerifications, icon: CheckCircle2, color: "text-blue-700" },
                { label: "HUID Verifications", value: OFFICER_STATS.huidVerifications, icon: Hash, color: "text-amber-700" },
                { label: "Complaint Submissions", value: OFFICER_STATS.complaintSubmissions, icon: AlertTriangle, color: "text-red-600" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                    <Icon className={`h-5 w-5 ${item.color}`} />
                    <div>
                      <p className="text-lg font-bold text-slate-900">{item.value.toLocaleString()}</p>
                      <p className="text-xs text-slate-500">{item.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Applications Tab ──────────────────────────────────────────── */}
      {activeTab === "applications" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-semibold text-slate-900">{t.officerApplications}</h2>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500">
              Demo data · {OFFICER_APPLICATIONS.length} records
            </span>
          </div>
          <ApplicationTable applications={OFFICER_APPLICATIONS} />
        </div>
      )}

      {/* ── Audit Trail Tab ───────────────────────────────────────────── */}
      {activeTab === "audit" && (
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Layers className="h-5 w-5 text-violet-700" />
              <h2 className="font-serif text-lg font-semibold text-slate-900">{t.officerBlockchain}</h2>
            </div>
            <p className="text-sm text-slate-500">
              Tamper-evident certificate records anchored in the demo Hardhat blockchain ledger.
              Click any record to inspect its cryptographic proof.
            </p>
          </div>

          <div className="rounded-2xl border border-violet-100 bg-violet-50/50 p-4 flex gap-3">
            <Shield className="h-5 w-5 text-violet-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs leading-relaxed text-violet-800">
              <strong>Technical note: </strong>
              The blockchain layer provides a tamper-evident record to verify whether stored certificate information has changed after issuance. It does <strong>not</strong> prove that a physical product is genuine or that a certificate was originally issued by BIS. One record below is intentionally marked TAMPERED to demonstrate anomaly detection.
            </div>
          </div>

          <div className="space-y-3">
            {OFFICER_AUDIT_RECORDS.map((record) => (
              <AuditCard key={record.certId} record={record} t={t} />
            ))}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white/80 p-5">
            <h3 className="font-serif text-sm font-semibold text-slate-900 mb-3">Demo Blockchain Network</h3>
            <div className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Network</p>
                <p className="font-medium text-slate-700">Hardhat Local</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Contract</p>
                <p className="font-mono text-slate-700 truncate">CertificateRegistry</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Records</p>
                <p className="font-medium text-slate-700">{OFFICER_AUDIT_RECORDS.length} (demo)</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Hash Fn</p>
                <p className="font-mono text-slate-700">Keccak-256</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
