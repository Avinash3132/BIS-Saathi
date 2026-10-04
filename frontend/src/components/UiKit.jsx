import React, { useState, useEffect } from "react";
import { Info, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

export function DemoBadge({ text }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800">
      <Info className="h-3.5 w-3.5" />
      {text}
    </span>
  );
}

export function StatusPill({ status, t }) {
  const map = {
    VALID: { icon: CheckCircle2, cls: "bg-emerald-50 text-emerald-700 border-emerald-300", label: t.statusValid },
    EXPIRED: { icon: AlertTriangle, cls: "bg-amber-50 text-amber-700 border-amber-300", label: t.statusExpired },
    INVALID: { icon: XCircle, cls: "bg-red-50 text-red-700 border-red-300", label: t.statusInvalid },
  };
  const s = map[status] || map.INVALID;
  const Icon = s.icon;
  return (
    <span className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-lg font-serif font-semibold ${s.cls}`}>
      <Icon className="h-5 w-5" />
      {s.label}
    </span>
  );
}

export function Spinner({ className = "h-4 w-4" }) {
  return (
    <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

/** A stylised, deterministic "demo QR" pattern */
export function DemoQrPattern({ seed }) {
  const bits = [];
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  for (let i = 0; i < 64; i++) {
    h = (h * 1103515245 + 12345) >>> 0;
    bits.push((h >>> 16) % 3 === 0);
  }
  return (
    <div className="inline-grid grid-cols-8 gap-0.5 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      {bits.map((on, i) => (
        <div key={i} className={`h-3 w-3 rounded-sm ${on ? "bg-slate-900" : "bg-slate-100"}`} />
      ))}
    </div>
  );
}

/** Skeleton loader placeholder */
export function Skeleton({ className = "h-4 w-full" }) {
  return <div className={`shimmer rounded-lg ${className}`} />;
}

/** Toast notification */
export function Toast({ message, type = "success", onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const clsMap = {
    success: "border-emerald-200 bg-emerald-50 text-emerald-800",
    error: "border-red-200 bg-red-50 text-red-800",
    info: "border-blue-200 bg-blue-50 text-blue-800",
  };

  return (
    <div className={`toast-in fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-2xl border px-5 py-3 text-sm font-medium shadow-lg ${clsMap[type]}`}>
      {type === "success" && <CheckCircle2 className="h-4 w-4" />}
      {type === "error" && <XCircle className="h-4 w-4" />}
      {type === "info" && <Info className="h-4 w-4" />}
      {message}
      <button onClick={onDismiss} className="ml-2 opacity-60 hover:opacity-100">
        <XCircle className="h-4 w-4" />
      </button>
    </div>
  );
}

/** Empty state */
export function EmptyState({ icon: Icon, title, body, action }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
      {Icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-200">
          <Icon className="h-6 w-6 text-slate-400" />
        </div>
      )}
      <h3 className="mt-3 font-serif text-base font-semibold text-slate-900">{title}</h3>
      {body && <p className="mt-1 text-sm text-slate-500">{body}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

/** Confidence badge */
export function ConfidenceBadge({ value }) {
  const color = value >= 90 ? "bg-emerald-100 text-emerald-700 border-emerald-200"
    : value >= 70 ? "bg-amber-100 text-amber-700 border-amber-200"
    : "bg-red-100 text-red-700 border-red-200";
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold ${color}`}>
      {value}% match
    </span>
  );
}
