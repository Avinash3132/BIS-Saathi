import React, { useState } from "react";
import {
  Building2, CheckCircle2, Circle, ArrowRight, ArrowLeft, ExternalLink,
  ChevronDown, ChevronUp, IndianRupee, Clock, FileText, Sparkles, AlertTriangle, Info,
} from "lucide-react";
import { DemoBadge } from "../components/UiKit.jsx";
import { DEMO_PRODUCTS } from "../data/demoData.js";

const TOTAL_STEPS = 6;

// ─── Step Indicator ─────────────────────────────────────────────────────────
function StepIndicator({ current, t }) {
  const steps = [
    t.mfgStep1, t.mfgStep2, t.mfgStep3,
    t.mfgStep4, t.mfgStep5, t.mfgStep6,
  ];
  return (
    <div className="mb-8">
      {/* Desktop */}
      <div className="hidden sm:flex items-center">
        {steps.map((label, i) => {
          const stepNum = i + 1;
          const done = stepNum < current;
          const active = stepNum === current;
          return (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-all ${
                    done ? "bg-emerald-500 text-white" : active ? "bg-blue-900 text-white shadow-lg shadow-blue-200" : "bg-slate-200 text-slate-400"
                  }`}
                >
                  {done ? <CheckCircle2 className="h-4 w-4" /> : stepNum}
                </div>
                <span
                  className={`max-w-[80px] text-center text-[10px] font-medium leading-tight ${
                    active ? "text-blue-900" : done ? "text-emerald-600" : "text-slate-400"
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`mb-5 h-0.5 flex-1 mx-1 rounded-full ${done ? "bg-emerald-400" : "bg-slate-200"}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
      {/* Mobile */}
      <div className="sm:hidden flex items-center justify-between">
        <span className="text-sm font-semibold text-blue-900">
          Step {current} of {TOTAL_STEPS}: {steps[current - 1]}
        </span>
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-5 rounded-full ${i + 1 < current ? "bg-emerald-400" : i + 1 === current ? "bg-blue-900" : "bg-slate-200"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Step 1: Product Selection ────────────────────────────────────────────────
function Step1({ t, lang, onSelect }) {
  const [query, setQuery] = useState("");

  function handleQuerySubmit() {
    // Try to match query keywords to demo products
    const q = query.toLowerCase();
    const match = DEMO_PRODUCTS.find((p) =>
      p.description.en.toLowerCase().includes(q.split(" ").find((w) => w.length > 3) || q)
    );
    onSelect(match || DEMO_PRODUCTS[0]);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white/80 p-6">
        <h2 className="font-serif text-xl font-semibold text-slate-900">{t.mfgPickProduct}</h2>
        <p className="mt-1 text-sm text-slate-500">
          Select a demo product or type a description to identify the applicable BIS standard.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {DEMO_PRODUCTS.map((product) => (
            <button
              key={product.id}
              onClick={() => onSelect(product)}
              className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-md transition-all card-hover"
            >
              <span className="text-2xl">{product.icon}</span>
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-blue-900">
                  {product.label[lang]}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">{product.description[lang]}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-5 border-t border-slate-100 pt-5">
          <p className="text-sm font-medium text-slate-600">{t.mfgOrType}</p>
          <div className="mt-2 flex gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && query && handleQuerySubmit()}
              placeholder="e.g. I manufacture steel helmets for two-wheelers..."
              className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
            />
            <button
              onClick={handleQuerySubmit}
              disabled={!query.trim()}
              className="flex items-center gap-2 rounded-xl bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-50 transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              {t.mfgIdentify}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Step 2: Standard Identified ─────────────────────────────────────────────
function Step2({ t, lang, product }) {
  const s = product.standard;
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Applicable Standard</p>
            <h2 className="mt-1 font-serif text-3xl font-bold text-slate-900">{s.isNumber}</h2>
            <p className="mt-1 text-sm font-medium text-slate-600">{s.title}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            {/* Confidence ring */}
            <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2">
              <div className="relative h-12 w-12">
                <svg className="h-12 w-12 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#d1fae5" strokeWidth="3" />
                  <circle
                    cx="18" cy="18" r="15" fill="none" stroke="#059669" strokeWidth="3"
                    strokeDasharray={`${(s.confidence / 100) * 94.25} 94.25`}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-emerald-700">
                  {s.confidence}%
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold text-emerald-800">{t.mfgConfidence}</p>
                <p className="text-[10px] text-emerald-600">(Demo value)</p>
              </div>
            </div>
          </div>
        </div>

        {s.mandatoryQCO && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5">
            <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0" />
            <div>
              <span className="text-xs font-semibold text-amber-800">Mandatory QCO: </span>
              <span className="text-xs text-amber-700">{s.mandatoryQCO}</span>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{t.mfgScope}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{s.scope}</p>
        </div>
        <div className="border-t border-slate-100 pt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{t.mfgWhy}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{s.explanation}</p>
        </div>
        <div className="border-t border-slate-100 pt-4 flex items-center gap-2">
          <FileText className="h-4 w-4 text-slate-400" />
          <p className="text-xs text-slate-500">Official Reference: <span className="font-medium text-slate-700">{s.citation}</span></p>
        </div>
      </div>
    </div>
  );
}

// ─── Step 3: Scheme Recommendation ───────────────────────────────────────────
function Step3({ t, product }) {
  const sch = product.scheme;
  const schemeColors = {
    ISI: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-900", badge: "bg-blue-900 text-white" },
    CRS: { bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-900", badge: "bg-violet-800 text-white" },
    FMCS: { bg: "bg-teal-50", border: "border-teal-200", text: "text-teal-900", badge: "bg-teal-800 text-white" },
  };
  const colors = schemeColors[sch.type] || schemeColors.ISI;

  return (
    <div className="space-y-4">
      <div className={`rounded-2xl border ${colors.border} ${colors.bg} p-6`}>
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{t.mfgScheme}</p>
            <h2 className={`mt-1 font-serif text-2xl font-bold ${colors.text}`}>{sch.name}</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${colors.badge}`}>{sch.type} Mark</span>
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${sch.mandatory ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-600"}`}>
              {sch.mandatory ? t.mfgMandatory : t.mfgVoluntary}
            </span>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-white/80 bg-white/60 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{t.mfgQco}</p>
          <p className="mt-1 text-sm font-medium text-slate-700">{sch.qco}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{t.mfgSchemeDesc}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{sch.reason}</p>
        </div>
        <div className="border-t border-slate-100 pt-4">
          <p className="text-sm text-slate-600 leading-relaxed">{sch.description}</p>
        </div>

        {/* Scheme comparison note */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold text-slate-500 mb-2">About BIS Certification Schemes</p>
          <div className="space-y-1.5 text-xs text-slate-600">
            <div className="flex items-start gap-2"><span className="font-semibold text-blue-800 w-20 flex-shrink-0">ISI Scheme I:</span><span>Factory inspection + product testing. For most mandatory BIS products.</span></div>
            <div className="flex items-start gap-2"><span className="font-semibold text-violet-700 w-20 flex-shrink-0">CRS:</span><span>Compulsory Registration Scheme for electronics. Self-declaration with lab test report.</span></div>
            <div className="flex items-start gap-2"><span className="font-semibold text-teal-700 w-20 flex-shrink-0">FMCS:</span><span>Foreign Manufacturers Certification Scheme. For imported products — 6–9 months.</span></div>
            <div className="flex items-start gap-2"><span className="font-semibold text-amber-700 w-20 flex-shrink-0">Hallmarking:</span><span>Gold/silver jewellery. Mandatory since 2021 for registered jewellers.</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Step 4: Document Checklist ───────────────────────────────────────────────
function Step4({ t, checkedDocs, setCheckedDocs, product }) {
  const [expanded, setExpanded] = useState(null);
  const docs = product.checklist;
  const doneCount = docs.filter((d) => checkedDocs[d.id]).length;

  function toggle(id) {
    setCheckedDocs((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white/80 p-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="font-serif text-xl font-semibold text-slate-900">{t.mfgDocs}</h2>
            <p className="mt-0.5 text-sm text-slate-500">
              Mark documents as ready to track your compliance readiness.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-bold text-emerald-700">
              {doneCount} of {docs.length} {t.mfgDocsProgress}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-2 w-full rounded-full bg-slate-100">
          <div
            className="h-2 rounded-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${(doneCount / docs.length) * 100}%` }}
          />
        </div>

        <div className="mt-5 space-y-2">
          {docs.map((doc) => {
            const isChecked = checkedDocs[doc.id];
            const isExpanded = expanded === doc.id;
            return (
              <div
                key={doc.id}
                className={`rounded-xl border transition-all ${
                  isChecked ? "border-emerald-200 bg-emerald-50/50" : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex items-center gap-3 p-4">
                  <button
                    onClick={() => toggle(doc.id)}
                    className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                      isChecked ? "border-emerald-500 bg-emerald-500" : "border-slate-300 hover:border-blue-400"
                    }`}
                    aria-label={`Mark "${doc.label}" as ${isChecked ? "incomplete" : "complete"}`}
                  >
                    {isChecked && <CheckCircle2 className="h-4 w-4 text-white" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-sm font-medium ${isChecked ? "line-through text-slate-400" : "text-slate-900"}`}>
                        {doc.label}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${doc.required ? "bg-red-100 text-red-600" : "bg-slate-100 text-slate-500"}`}>
                        {doc.required ? t.mfgRequired : t.mfgOptional}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setExpanded(isExpanded ? null : doc.id)}
                    className="p-1 text-slate-400 hover:text-slate-600"
                    aria-label={isExpanded ? "Collapse" : "Expand"}
                  >
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                </div>
                {isExpanded && (
                  <div className="border-t border-slate-100 px-4 pb-3 pt-2">
                    <p className="text-xs leading-relaxed text-slate-600">{doc.description}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Step 5: Compliance Review ────────────────────────────────────────────────
function Step5({ t, lang, product, checkedDocs, isMsme, setIsMsme }) {
  const docs = product.checklist;
  const doneCount = docs.filter((d) => checkedDocs[d.id]).length;
  const readiness = Math.round((doneCount / docs.length) * 100);
  const missingDocs = docs.filter((d) => !checkedDocs[d.id]);
  const fees = product.fees;
  const inspTotal = fees.inspectionPerManDay * fees.estimatedManDays;
  const baseTotal = fees.application + inspTotal + fees.annualLicence;
  const discount = isMsme ? Math.round(baseTotal * (fees.msmeDiscount / 100)) : 0;
  const finalTotal = baseTotal - discount;

  const readinessColor =
    readiness >= 80 ? "text-emerald-600" : readiness >= 50 ? "text-amber-600" : "text-red-600";
  const readinessBg =
    readiness >= 80 ? "bg-emerald-500" : readiness >= 50 ? "bg-amber-500" : "bg-red-400";

  return (
    <div className="space-y-4">
      {/* Readiness card */}
      <div className="rounded-2xl border border-slate-200 bg-white/80 p-6">
        <h2 className="font-serif text-xl font-semibold text-slate-900">{t.mfgReview}</h2>
        <div className="mt-4 flex items-center gap-5">
          {/* Ring */}
          <div className="relative h-20 w-20 flex-shrink-0">
            <svg className="h-20 w-20 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15" fill="none" stroke="#e2e8f0" strokeWidth="3" />
              <circle
                cx="18" cy="18" r="15" fill="none"
                stroke={readiness >= 80 ? "#10b981" : readiness >= 50 ? "#f59e0b" : "#f87171"}
                strokeWidth="3"
                strokeDasharray={`${(readiness / 100) * 94.25} 94.25`}
                strokeLinecap="round"
              />
            </svg>
            <span className={`absolute inset-0 flex items-center justify-center text-lg font-bold ${readinessColor}`}>
              {readiness}%
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700">{t.mfgReadiness}</p>
            <div className="mt-1 h-2 w-48 rounded-full bg-slate-100">
              <div className={`h-2 rounded-full ${readinessBg} transition-all`} style={{ width: `${readiness}%` }} />
            </div>
            <p className="mt-1 text-xs text-slate-500">
              {doneCount} of {docs.length} documents ready
            </p>
          </div>
        </div>

        {/* Summary grid */}
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Product</p>
            <p className="mt-1 font-medium text-slate-800">{product.label[lang]}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Standard</p>
            <p className="mt-1 font-medium text-slate-800">{product.standard.isNumber}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Scheme</p>
            <p className="mt-1 font-medium text-slate-800">{product.scheme.name}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">QCO Status</p>
            <p className={`mt-1 font-medium ${product.scheme.mandatory ? "text-red-600" : "text-emerald-600"}`}>
              {product.scheme.mandatory ? "Mandatory Certification" : "Voluntary Certification"}
            </p>
          </div>
        </div>

        {missingDocs.length > 0 && (
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-xs font-semibold text-amber-800 mb-2">{t.mfgMissing}</p>
            <ul className="space-y-1">
              {missingDocs.map((d) => (
                <li key={d.id} className="flex items-center gap-2 text-xs text-amber-700">
                  <Circle className="h-3 w-3" />
                  {d.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Fee calculator */}
      <div className="rounded-2xl border border-slate-200 bg-white/80 p-6">
        <div className="flex items-center gap-2 mb-4">
          <IndianRupee className="h-5 w-5 text-blue-900" />
          <h3 className="font-serif text-lg font-semibold text-slate-900">{t.mfgFees}</h3>
        </div>

        {/* MSME toggle */}
        <div className="mb-4 flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50 p-3">
          <div>
            <p className="text-sm font-semibold text-blue-900">MSME Enterprise?</p>
            <p className="text-xs text-blue-700">Get 20% concession on all BIS fees</p>
          </div>
          <button
            onClick={() => setIsMsme(!isMsme)}
            className={`relative inline-flex h-6 w-11 cursor-pointer rounded-full border-2 border-transparent transition-colors ${isMsme ? "bg-blue-600" : "bg-slate-300"}`}
            role="switch"
            aria-checked={isMsme}
          >
            <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${isMsme ? "translate-x-5" : "translate-x-0"}`} />
          </button>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>{t.mfgAppFee}</span>
            <span className="font-medium">₹{fees.application.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>{t.mfgInspFee} ({fees.estimatedManDays} man-days)</span>
            <span className="font-medium">₹{inspTotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>{t.mfgLicFee}</span>
            <span className="font-medium">₹{fees.annualLicence.toLocaleString()}</span>
          </div>
          {isMsme && (
            <div className="flex justify-between text-emerald-600 font-medium">
              <span>MSME Discount (20%)</span>
              <span>−₹{discount.toLocaleString()}</span>
            </div>
          )}
          <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-slate-900">
            <span>Estimated Total</span>
            <span className="text-blue-900">₹{finalTotal.toLocaleString()}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <Clock className="h-4 w-4 text-slate-400 flex-shrink-0" />
          <div className="text-xs text-slate-600">
            <span className="font-semibold">Timeline: </span>
            Simplified: {fees.timeline.simplified} · Standard: {fees.timeline.standard}
          </div>
        </div>

        <p className="mt-3 text-[11px] text-slate-400 flex items-start gap-1">
          <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
          {t.mfgDisclaimer}
        </p>
      </div>
    </div>
  );
}

// ─── Step 6: Apply on Manakonline ─────────────────────────────────────────────
function Step6({ t, lang, product, checkedDocs }) {
  const docs = product.checklist;
  const doneCount = docs.filter((d) => checkedDocs[d.id]).length;
  const readiness = Math.round((doneCount / docs.length) * 100);

  return (
    <div className="space-y-4">
      {/* Hero CTA */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-900 to-blue-700 p-8 text-white text-center">
        <div className="flex justify-center mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
            <ExternalLink className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="font-serif text-2xl font-bold">{t.mfgApply}</h2>
        <p className="mt-2 text-blue-200">{t.mfgApplyNote}</p>
        <a
          href="https://manakonline.bis.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2.5 rounded-xl bg-white px-8 py-3.5 text-base font-bold text-blue-900 shadow-lg hover:bg-blue-50 transition-colors"
        >
          Apply on Manakonline
          <ExternalLink className="h-5 w-5" />
        </a>
        <p className="mt-3 text-xs text-blue-300">
          Opens manakonline.bis.gov.in in a new tab
        </p>
      </div>

      {/* Final summary */}
      <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 space-y-4">
        <h3 className="font-serif text-lg font-semibold text-slate-900">Your Compliance Summary</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Product</p>
            <p className="mt-0.5 text-sm font-medium text-slate-800">{product.label[lang]}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Standard</p>
            <p className="mt-0.5 text-sm font-medium text-slate-800">{product.standard.isNumber}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Scheme</p>
            <p className="mt-0.5 text-sm font-medium text-slate-800">{product.scheme.name}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Readiness</p>
            <p className={`mt-0.5 text-sm font-bold ${readiness >= 80 ? "text-emerald-600" : "text-amber-600"}`}>
              {readiness}% — {doneCount}/{docs.length} documents
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
          <p className="text-xs font-semibold text-blue-900 mb-1.5">Important Next Steps on Manakonline:</p>
          <ol className="space-y-1 text-xs text-blue-800">
            <li>1. Create a manufacturer account at manakonline.bis.gov.in</li>
            <li>2. Select "Apply for Licence to Use Standard Mark"</li>
            <li>3. Choose the product category and enter standard: <strong>{product.standard.isNumber}</strong></li>
            <li>4. Upload all documents from the checklist</li>
            <li>5. Pay the application fee (₹1,000) online</li>
            <li>6. Schedule BIS factory inspection</li>
          </ol>
        </div>

        <div className="rounded-xl border border-amber-100 bg-amber-50 p-3">
          <p className="text-[11px] text-amber-700 leading-relaxed">
            <strong>Disclaimer: </strong>{t.mfgDisclaimer}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Manufacturer Page ───────────────────────────────────────────────────
export default function Manufacturer({ t, lang }) {
  const [step, setStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkedDocs, setCheckedDocs] = useState({});
  const [isMsme, setIsMsme] = useState(false);

  function handleProductSelect(product) {
    setSelectedProduct(product);
    setCheckedDocs({});
    setStep(2);
  }

  function nextStep() {
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }

  function prevStep() {
    setStep((s) => Math.max(s - 1, 1));
  }

  function startOver() {
    setStep(1);
    setSelectedProduct(null);
    setCheckedDocs({});
    setIsMsme(false);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Building2 className="h-5 w-5 text-blue-900" />
          <h1 className="font-serif text-2xl font-semibold text-slate-900">{t.mfgTitle}</h1>
        </div>
        <p className="text-sm text-slate-500">{t.mfgSub}</p>
        <div className="mt-3">
          <DemoBadge text={t.demoBadge} />
        </div>
      </div>

      {/* Step Indicator */}
      <StepIndicator current={step} t={t} />

      {/* Step Content */}
      {step === 1 && <Step1 t={t} lang={lang} onSelect={handleProductSelect} />}
      {step === 2 && selectedProduct && <Step2 t={t} lang={lang} product={selectedProduct} />}
      {step === 3 && selectedProduct && <Step3 t={t} product={selectedProduct} />}
      {step === 4 && selectedProduct && (
        <Step4 t={t} product={selectedProduct} checkedDocs={checkedDocs} setCheckedDocs={setCheckedDocs} />
      )}
      {step === 5 && selectedProduct && (
        <Step5 t={t} lang={lang} product={selectedProduct} checkedDocs={checkedDocs} isMsme={isMsme} setIsMsme={setIsMsme} />
      )}
      {step === 6 && selectedProduct && (
        <Step6 t={t} lang={lang} product={selectedProduct} checkedDocs={checkedDocs} />
      )}

      {/* Navigation */}
      {step > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={prevStep}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.mfgBack}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={startOver}
              className="text-xs font-medium text-slate-400 hover:text-slate-600 underline underline-offset-2"
            >
              {t.mfgStartOver}
            </button>
            {step < TOTAL_STEPS && (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 rounded-xl bg-blue-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 transition-colors"
              >
                {t.mfgNext}
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
