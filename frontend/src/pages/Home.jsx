import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles, QrCode, ShieldCheck, Languages, ChevronRight, ArrowRight,
  Building2, Shield, Gem, AlertTriangle, FileText
} from "lucide-react";
import { DemoBadge } from "../components/UiKit.jsx";
import { EXAMPLE_QUESTIONS } from "../i18n/strings.js";

export default function Home({ t, lang }) {
  const navigate = useNavigate();

  function askWithQuestion(question) {
    navigate("/assistant", { state: { prefill: question } });
  }

  const featureIcons = [Sparkles, ShieldCheck, Languages, Building2];
  const featureColors = ["text-blue-700 bg-blue-50", "text-emerald-700 bg-emerald-50", "text-violet-700 bg-violet-50", "text-amber-700 bg-amber-50"];

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-slate-200/80">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.3) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)" }}
        />
        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <DemoBadge text={t.demoBadge} />
          <h1 className="mt-5 max-w-2xl font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">
            {t.heroTitle1}
            <br />
            <span className="text-blue-200">{t.heroTitle2}</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-blue-200">{t.heroSub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/assistant")}
              className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-900 shadow-lg hover:bg-blue-50 transition-colors"
            >
              <Sparkles className="h-4 w-4" /> {t.askBtn}
            </button>
            <button
              onClick={() => navigate("/verify")}
              className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors backdrop-blur"
            >
              <QrCode className="h-4 w-4" /> {t.verifyBtn}
            </button>
            <button
              onClick={() => navigate("/manufacturer")}
              className="flex items-center gap-2 rounded-xl border border-amber-300/50 bg-amber-500/20 px-5 py-3 text-sm font-semibold text-amber-200 hover:bg-amber-500/30 transition-colors backdrop-blur"
            >
              <Building2 className="h-4 w-4" /> {t.manufacturerBtn}
            </button>
          </div>

          {/* Portal quick-access chips */}
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              { label: "🟢 Consumer Portal", path: "/", color: "bg-emerald-900/50 text-emerald-200 border-emerald-700/40" },
              { label: "🏢 Manufacturer / MSME", path: "/manufacturer", color: "bg-blue-900/50 text-blue-200 border-blue-700/40" },
              { label: "🛡️ BIS Officer Portal", path: "/officer", color: "bg-violet-900/50 text-violet-200 border-violet-700/40" },
            ].map((portal) => (
              <button
                key={portal.path}
                onClick={() => navigate(portal.path)}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${portal.color} hover:brightness-110`}
              >
                {portal.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features grid ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.features.map((f, i) => {
            const Icon = featureIcons[i];
            const colCls = featureColors[i];
            return (
              <div
                key={i}
                className="card-hover group rounded-2xl border border-slate-200 bg-white/80 p-5 backdrop-blur"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${colCls}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-serif text-base font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{f.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Example questions ─────────────────────────────────────────── */}
      <section className="border-t border-slate-100 bg-slate-50/80">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <h2 className="font-serif text-2xl font-semibold text-slate-900">{t.examplesTitle}</h2>
          <p className="mt-1 text-sm text-slate-500">Quick-start queries for the AI Standards Assistant</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {EXAMPLE_QUESTIONS.map((q, i) => (
              <button
                key={i}
                onClick={() => askWithQuestion(q[lang])}
                className="card-hover flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left text-sm text-slate-700 hover:border-blue-300 hover:bg-blue-50/50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-blue-800 flex-shrink-0" />
                  {q[lang]}
                </div>
                <ChevronRight className="h-4 w-4 flex-shrink-0 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portal showcase ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <h2 className="font-serif text-2xl font-semibold text-slate-900">{t.howTitle}</h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {/* Consumer */}
          <div className="card-hover rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
              <ShieldCheck className="h-5 w-5 text-emerald-700" />
            </div>
            <h3 className="mt-3 font-serif text-lg font-semibold text-slate-900">Consumer Portal</h3>
            <p className="mt-1 text-sm text-slate-600">Zero-login. Instantly verify certificates, check HUID gold hallmarks, ask about standards, and report fake products.</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {t.flow2.map((s, i) => (
                <React.Fragment key={i}>
                  <span className="rounded-lg bg-emerald-100 px-2.5 py-1.5 text-xs font-medium text-emerald-800">{s}</span>
                  {i < t.flow2.length - 1 && <ArrowRight className="h-3 w-3 text-slate-400" />}
                </React.Fragment>
              ))}
            </div>
            <button
              onClick={() => navigate("/verify")}
              className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:underline underline-offset-2"
            >
              Verify a Certificate <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          {/* Manufacturer */}
          <div className="card-hover rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <Building2 className="h-5 w-5 text-blue-700" />
            </div>
            <h3 className="mt-3 font-serif text-lg font-semibold text-slate-900">Manufacturer Portal</h3>
            <p className="mt-1 text-sm text-slate-600">6-step compliance wizard: identify your standard, select a scheme, prepare documents, calculate fees, and apply on Manakonline.</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {t.flow3.map((s, i) => (
                <React.Fragment key={i}>
                  <span className="rounded-lg bg-blue-100 px-2.5 py-1.5 text-xs font-medium text-blue-800">{s}</span>
                  {i < t.flow3.length - 1 && <ArrowRight className="h-3 w-3 text-slate-400" />}
                </React.Fragment>
              ))}
            </div>
            <button
              onClick={() => navigate("/manufacturer")}
              className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:underline underline-offset-2"
            >
              Start Compliance Wizard <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          {/* Officer */}
          <div className="card-hover rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-white p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
              <Shield className="h-5 w-5 text-violet-700" />
            </div>
            <h3 className="mt-3 font-serif text-lg font-semibold text-slate-900">Officer Portal</h3>
            <p className="mt-1 text-sm text-slate-600">Analytics dashboard, complaint monitoring, application pipeline, and tamper-evident blockchain audit trail for BIS officers.</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {["Analytics", "Applications", "Audit Trail"].map((s, i, arr) => (
                <React.Fragment key={i}>
                  <span className="rounded-lg bg-violet-100 px-2.5 py-1.5 text-xs font-medium text-violet-800">{s}</span>
                  {i < arr.length - 1 && <ArrowRight className="h-3 w-3 text-slate-400" />}
                </React.Fragment>
              ))}
            </div>
            <button
              onClick={() => navigate("/officer")}
              className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-violet-700 hover:underline underline-offset-2"
            >
              View Officer Portal <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
        <p className="mt-6 text-xs text-slate-400">{t.comingSoon}</p>
      </section>

      {/* ── Report Fake CTA ───────────────────────────────────────────── */}
      <section className="border-t border-red-100 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="mx-auto max-w-6xl px-5 py-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-900">{t.reportFake}</h3>
                <p className="text-sm text-red-700">{t.reportFakeSub}</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/verify")}
              className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition-colors flex-shrink-0"
            >
              <AlertTriangle className="h-4 w-4" />
              Report via Verify Page
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
