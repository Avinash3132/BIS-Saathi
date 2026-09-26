import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import Assistant from "./pages/Assistant.jsx";
import Verify from "./pages/Verify.jsx";
import CertificateDetail from "./pages/CertificateDetail.jsx";
import About from "./pages/About.jsx";
import Manufacturer from "./pages/Manufacturer.jsx";
import Officer from "./pages/Officer.jsx";
import { T } from "./i18n/strings.js";

export default function App() {
  const [lang, setLang] = useState("en");
  const t = T[lang];

  return (
    <MainLayout lang={lang} setLang={setLang} t={t}>
      <Routes>
        <Route path="/" element={<Home t={t} lang={lang} />} />
        <Route path="/assistant" element={<Assistant t={t} lang={lang} />} />
        <Route path="/verify" element={<Verify t={t} lang={lang} />} />
        <Route path="/certificate/:id" element={<CertificateDetail t={t} lang={lang} />} />
        <Route path="/about" element={<About t={t} />} />
        <Route path="/manufacturer" element={<Manufacturer t={t} lang={lang} />} />
        <Route path="/officer" element={<Officer t={t} lang={lang} />} />
      </Routes>
    </MainLayout>
  );
}
