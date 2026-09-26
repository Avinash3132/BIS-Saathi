import React from "react";
import TopNav from "../components/TopNav.jsx";

export default function MainLayout({ lang, setLang, t, children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 font-sans text-slate-900">
      <TopNav lang={lang} setLang={setLang} t={t} />
      <main className="fade-in">{children}</main>
      <footer className="border-t border-slate-200/80 bg-white/60 py-6 text-center text-xs text-slate-400">
        BIS-Saathi — SIH prototype (SIH26107) ·{" "}
        <span className="font-medium text-amber-600">
          {t.demoBadge}
        </span>
      </footer>
    </div>
  );
}
