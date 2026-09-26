/* eslint-disable no-unused-vars */

/** Never leak stack traces to the client — log server-side, return a clean message. */
function errorHandler(err, req, res, next) {
  console.error(`[error] ${req.method} ${req.originalUrl}:`, err.message);
  const status = err.statusCode || 500;
  res.status(status).json({
    error: status === 500 ? "Something went wrong. Please try again." : err.message,
  });
}

function notFoundHandler(req, res) {
  res.status(404).json({ error: `No route for ${req.method} ${req.originalUrl}` });
}

module.exports = { errorHandler, notFoundHandler };
