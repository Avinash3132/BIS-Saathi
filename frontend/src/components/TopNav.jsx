import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Languages, Menu, X, ChevronDown, Users, Building2, Shield } from "lucide-react";

const PORTALS = [
  {
    key: "consumer",
    icon: Users,
    dot: "bg-emerald-500",
    path: "/",
    badge: "Public",
    badgeCls: "bg-emerald-100 text-emerald-700",
  },
  {
    key: "manufacturer",
    icon: Building2,
    dot: "bg-blue-500",
    path: "/manufacturer",
    badge: "MSME",
    badgeCls: "bg-blue-100 text-blue-700",
  },
  {
    key: "officer",
    icon: Shield,
    dot: "bg-violet-500",
    path: "/officer",
    badge: "Admin",
    badgeCls: "bg-violet-100 text-violet-700",
  },
];

function getPortalFromPath(pathname) {
  if (pathname.startsWith("/officer")) return "officer";
  if (pathname.startsWith("/manufacturer")) return "manufacturer";
  return "consumer";
}

export default function TopNav({ lang, setLang, t }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropRef = useRef(null);

  const activePortalKey = getPortalFromPath(location.pathname);
  const activePortal = PORTALS.find((p) => p.key === activePortalKey);
  const ActiveIcon = activePortal.icon;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setPortalOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const consumerNavItems = [
    ["/", t.nav.home],
    ["/assistant", t.nav.assistant],
    ["/verify", t.nav.verify],
    ["/about", t.nav.about],
  ];

  const manufacturerNavItems = [
    ["/manufacturer", t.nav.manufacturer],
    ["/assistant", t.nav.assistant],
  ];

  const officerNavItems = [
    ["/officer", t.nav.officer],
    ["/about", t.nav.about],
  ];

  const navItems =
    activePortalKey === "manufacturer"
      ? manufacturerNavItems
      : activePortalKey === "officer"
      ? officerNavItems
      : consumerNavItems;

  const portalBarCls =
    activePortalKey === "officer"
      ? "bg-gradient-to-r from-violet-900 to-violet-800"
      : activePortalKey === "manufacturer"
      ? "bg-gradient-to-r from-blue-900 to-blue-800"
      : null;

  return (
    <>
      {/* Portal indicator bar */}
      {activePortalKey !== "consumer" && (
        <div className={`${portalBarCls} py-1 text-center text-xs font-medium text-white/90`}>
          {t.portal.viewingAs}{" "}
          <span className="font-semibold">
            {activePortalKey === "officer" ? t.portal.officer : t.portal.manufacturer}
          </span>{" "}
          —{" "}
          <button
            onClick={() => navigate("/")}
            className="underline underline-offset-2 hover:text-white"
          >
            {t.portal.consumer}
          </button>
        </div>
      )}

      <header className="sticky top-0 z-30 glass border-b border-white/60 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0" onClick={() => setMenuOpen(false)}>
            <img src="/favicon.png" alt="BIS-Saathi logo" className="h-9 w-9 rounded-xl object-cover shadow-sm" />
            <div className="hidden sm:block">
              <span className="font-serif text-lg font-semibold text-slate-900">{t.brand}</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-0.5 md:flex">
            {navItems.map(([path, label]) => (
              <Link
                key={path}
                to={path}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                  location.pathname === path
                    ? "bg-blue-50 text-blue-900 shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Portal Switcher */}
            <div className="relative" ref={dropRef}>
              <button
                onClick={() => setPortalOpen(!portalOpen)}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:border-slate-300 hover:shadow transition-all"
                aria-expanded={portalOpen}
                aria-haspopup="true"
              >
                <span className={`h-2 w-2 rounded-full ${activePortal.dot} flex-shrink-0`} />
                <ActiveIcon className="h-3.5 w-3.5 flex-shrink-0 text-slate-500" />
                <span className="hidden sm:inline">
                  {activePortalKey === "consumer"
                    ? t.portal.consumer
                    : activePortalKey === "manufacturer"
                    ? t.portal.manufacturer
                    : t.portal.officer}
                </span>
                <ChevronDown
                  className={`h-3.5 w-3.5 text-slate-400 transition-transform ${portalOpen ? "rotate-180" : ""}`}
                />
              </button>

              {portalOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/80 overflow-hidden z-50">
                  <div className="px-4 pt-3 pb-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      {t.portal.switchPortal}
                    </p>
                  </div>
                  {PORTALS.map((portal) => {
                    const Icon = portal.icon;
                    const isActive = portal.key === activePortalKey;
                    const name =
                      portal.key === "consumer"
                        ? t.portal.consumer
                        : portal.key === "manufacturer"
                        ? t.portal.manufacturer
                        : t.portal.officer;
                    const desc =
                      portal.key === "consumer"
                        ? t.portal.consumerDesc
                        : portal.key === "manufacturer"
                        ? t.portal.manufacturerDesc
                        : t.portal.officerDesc;

                    return (
                      <button
                        key={portal.key}
                        onClick={() => {
                          navigate(portal.path);
                          setPortalOpen(false);
                          setMenuOpen(false);
                        }}
                        className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50 ${
                          isActive ? "bg-blue-50/60" : ""
                        }`}
                      >
                        <div
                          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${
                            portal.key === "consumer"
                              ? "bg-emerald-100"
                              : portal.key === "manufacturer"
                              ? "bg-blue-100"
                              : "bg-violet-100"
                          }`}
                        >
                          <Icon
                            className={`h-4 w-4 ${
                              portal.key === "consumer"
                                ? "text-emerald-700"
                                : portal.key === "manufacturer"
                                ? "text-blue-700"
                                : "text-violet-700"
                            }`}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-slate-900">{name}</span>
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${portal.badgeCls}`}>
                              {portal.badge}
                            </span>
                            {isActive && (
                              <span className="ml-auto text-xs font-medium text-blue-600">✓ Active</span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 truncate">{desc}</p>
                        </div>
                      </button>
                    );
                  })}
                  <div className="border-t border-slate-100 px-4 py-2.5">
                    <p className="text-[11px] text-slate-400">
                      SIH26107 Demo — All portals use synthetic data
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:border-slate-300 transition-all"
              title={t.langLabel}
            >
              <Languages className="h-4 w-4" />
              <span className="hidden sm:inline">{lang === "en" ? "EN / हिं" : "हिं / EN"}</span>
            </button>

            {/* Mobile menu */}
            <button
              className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <nav className="flex flex-col gap-1 border-t border-slate-100 bg-white/95 backdrop-blur px-4 py-3 md:hidden">
            {navItems.map(([path, label]) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                  location.pathname === path ? "bg-blue-50 text-blue-900" : "text-slate-600"
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="mt-2 border-t border-slate-100 pt-2">
              <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                {t.portal.switchPortal}
              </p>
              {PORTALS.map((portal) => {
                const Icon = portal.icon;
                const name =
                  portal.key === "consumer"
                    ? t.portal.consumer
                    : portal.key === "manufacturer"
                    ? t.portal.manufacturer
                    : t.portal.officer;
                return (
                  <button
                    key={portal.key}
                    onClick={() => {
                      navigate(portal.path);
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-600 hover:bg-slate-50"
                  >
                    <span className={`h-2 w-2 rounded-full ${portal.dot}`} />
                    <Icon className="h-4 w-4 text-slate-400" />
                    {name}
                  </button>
                );
              })}
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
