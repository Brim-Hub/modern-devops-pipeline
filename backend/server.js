const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

console.log("🚀 Starting backend server...");
console.log("📦 Environment loaded");

// =======================
// MongoDB Connection
// =======================
console.log("⏳ Connecting to MongoDB...");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    console.log("📡 Database is ready to use");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed");
    console.error(err.message);
  });

// =======================
// Schema
// =======================
console.log("🧱 Defining User Schema...");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

console.log("📊 User Model Created");

// =======================
// Routes
// =======================

// Health Check
app.get("/health", (req, res) => {
  console.log("🔍 GET /health called");

  res.status(200).json({
    success: true,
    message: "Backend Healthy",
    timestamp: new Date(),
  });
});

// Get Users
app.get("/api/users", async (req, res) => {
  console.log("📥 GET /api/users called");

  try {
    const users = await User.find().sort({ createdAt: -1 });

    console.log(`✅ Fetched ${users.length} users`);

    res.json(users);
  } catch (err) {
    console.error("❌ Error fetching users:", err.message);

    res.status(500).json({ message: err.message });
  }
});

// Create User
app.post("/api/users", async (req, res) => {
  console.log("📤 POST /api/users called");
  console.log("📦 Payload:", req.body);

  try {
    const user = await User.create(req.body);

    console.log("✅ User created:", user.email);

    res.status(201).json(user);
  } catch (error) {
    console.error("❌ Error creating user:", error.message);

    res.status(400).json({
      message: error.message,
    });
  }
});

// =======================
// Start Server
// =======================
app.listen(PORT, () => {
  console.log("====================================");
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 http://localhost:${PORT}`);
  console.log("====================================");
});