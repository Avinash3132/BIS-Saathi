const dns = require("dns");
const mongoose = require("mongoose");

// Use public DNS resolvers for MongoDB Atlas SRV resolution.
dns.setServers(["1.1.1.1", "8.8.8.8"]);

let isConnected = false;
async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (process.env.DEMO_MODE === "true" && !uri) {
    console.log("[db] DEMO_MODE=true and no MONGODB_URI set — skipping MongoDB connection.");
    return;
  }

  if (!uri) {
    throw new Error("MONGODB_URI is not set. Set it in backend/.env or enable DEMO_MODE.");
  }

  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log("[db] Connected to MongoDB");
  } catch (err) {
    console.error("[db] MongoDB connection failed:", err.message);
    if (process.env.DEMO_MODE === "true") {
      console.warn("[db] Continuing in DEMO_MODE without a database connection.");
    } else {
      throw err;
    }
  }
}

function dbIsConnected() {
  return isConnected;
}

module.exports = { connectDB, dbIsConnected };
