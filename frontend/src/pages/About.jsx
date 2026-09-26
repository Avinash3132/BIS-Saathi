import React from "react";
import { Shield, Cpu, Link2, Database, Globe, Info } from "lucide-react";

export default function About({ t }) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <div className="mb-6 flex items-center gap-2">
        <Info className="h-5 w-5 text-blue-900" />
        <h1 className="font-serif text-2xl font-semibold text-slate-900">{t.aboutTitle}</h1>
      </div>

      <div className="space-y-5">
        {/* Problem Statement */}
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-6">
          <p className="text-sm leading-relaxed text-slate-700">
            <strong>BIS-Saathi</strong> is a Smart India Hackathon demonstration prototype built for problem statement{" "}
            <strong>SIH26107</strong> (Theme: Smart Automation). It is <strong>not</strong> a production government
            platform and does not connect to any official BIS database or genuine certificate registry.
          </p>
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm font-medium text-amber-900">Core Positioning</p>
            <p className="mt-1.5 text-sm text-amber-800">
              Just as DigiLocker didn't replace document issuers and UPI didn't replace banks —{" "}
              <strong>BIS-Saathi does not replace manakonline.bis.gov.in</strong>. Manakonline is{" "}
              <em>where</em> you apply. BIS-Saathi is <em>how</em> you discover what to apply for,
              calculate fees, get the checklist, and understand the process.
            </p>
          </div>
        </div>

        {/* Architecture */}
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-6">
          <p className="font-serif text-base font-semibold text-slate-900 mb-3">Full Production Architecture</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              { icon: Globe, label: "Frontend", val: "React + Vite + Tailwind CSS", color: "text-blue-700 bg-blue-50" },
              { icon: Cpu, label: "Backend", val: "Node.js + Express + MongoDB Atlas", color: "text-emerald-700 bg-emerald-50" },
              { icon: Shield, label: "AI / RAG", val: "FastAPI + BGE-M3 + ChromaDB + Ollama (Llama 3 8B)", color: "text-violet-700 bg-violet-50" },
              { icon: Link2, label: "Blockchain", val: "Hardhat + Solidity + ethers.js", color: "text-amber-700 bg-amber-50" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-start gap-3 rounded-xl bg-slate-50 p-3">
                  <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${item.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500">{item.label}</p>
                    <p className="text-sm font-medium text-slate-800">{item.val}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-900 p-4 text-xs text-slate-100 leading-relaxed">
{`React + Vite  →  Node.js + Express  →  MongoDB Atlas
                          ↓
                FastAPI AI service
                (BGE-M3 embeddings → ChromaDB → Llama 3 8B)

QR / Cert ID → Express API → ethers.js → Solidity contract
                                        → Officer Audit Trail`}
          </pre>
        </div>

        {/* Demo mode */}
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <p className="font-semibold text-blue-900 mb-2">How Demo Mode Works</p>
          <p className="text-sm text-blue-800 leading-relaxed">
            With <code className="rounded bg-blue-100 px-1 py-0.5 text-xs">AI_DEMO_MODE=true</code> and{" "}
            <code className="rounded bg-blue-100 px-1 py-0.5 text-xs">DEMO_MODE=true</code> (the defaults),
            the assistant uses keyword retrieval over five short paraphrased demo documents instead of live
            embeddings, and the blockchain proof uses a deterministic hash simulation instead of a live
            smart-contract call. The full product stays demonstrable with only Node.js and Python installed.
          </p>
        </div>

        {/* Honest claims */}
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-6">
          <p className="font-serif text-base font-semibold text-slate-900 mb-3">Honest Claims</p>
          <div className="space-y-3 text-sm">
            {[
              { ok: false, wrong: "Blockchain proves that a product is genuine.", right: "Blockchain provides a tamper-evident record to verify whether registered certificate information has been altered." },
              { ok: false, wrong: "AI certifies the manufacturer.", right: "AI assists manufacturers in identifying relevant standards, schemes, and compliance requirements." },
              { ok: false, wrong: "This is an official BIS platform.", right: "This is an SIH demonstration prototype (SIH26107). All certificates, HUIDs, and records are synthetic demo data." },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-1.5">
                <p className="text-red-600 text-xs flex items-start gap-1.5"><span className="font-bold flex-shrink-0">✗</span> {item.wrong}</p>
                <p className="text-emerald-700 text-xs flex items-start gap-1.5"><span className="font-bold flex-shrink-0">✓</span> {item.right}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Out of scope */}
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-6">
          <p className="font-serif text-base font-semibold text-slate-900 mb-2">Intentionally Out of Scope (Future Roadmap)</p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Full production Industry/Officer/Admin portals, Kafka, Redis, Kubernetes, Hyperledger Fabric, IPFS,
            a native mobile app, a WhatsApp bot, and enterprise observability (Prometheus/Grafana, API Gateway)
            are not built. They appear only as future roadmap concepts in the report.
          </p>
        </div>
      </div>
    </div>
  );
}
