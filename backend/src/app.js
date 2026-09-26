const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const assistantRoutes = require("./routes/assistantRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const qrRoutes = require("./routes/qrRoutes");
const { errorHandler, notFoundHandler } = require("./middleware/errorHandler");

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json({ limit: "100kb" }));

// Basic abuse protection on the API surface.
app.use(
  "/api",
  rateLimit({
    windowMs: 60 * 1000,
    max: 60,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    demoMode: process.env.DEMO_MODE === "true",
    service: "bis-saathi-backend",
  });
});

app.use("/api/assistant", assistantRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/qr", qrRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
