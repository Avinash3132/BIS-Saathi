require("dotenv").config();
const app = require("./app");
const { connectDB } = require("./config/db");

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`[server] BIS-Saathi backend listening on port ${PORT}`);
    console.log(`[server] DEMO_MODE=${process.env.DEMO_MODE === "true"}`);
  });
})();
