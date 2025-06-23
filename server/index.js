// server/index.js
const express = require("express");
const cors = require("cors");
const prisma = require("./prismaClient");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// -----------------------------
// 🧑‍💻 AUTH ROUTES
// -----------------------------

// Sign Up Route
app.post("/auth/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: "User already exists" });

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, // ⚠️ In production, hash this!
        points: 500,
      },
    });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      points: user.points,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Signup failed" });
  }
});

// Login Route
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      points: user.points,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

// -----------------------------
// 📢 COMPLAINT ROUTES
// -----------------------------

// Create a new complaint
app.post("/complaints", async (req, res) => {
  const { title, description, lat, lng, userId } = req.body;

  try {
    const newComplaint = await prisma.complaint.create({
      data: {
        title,
        description,
        lat,
        lng,
        status: "Pending",
        user: { connect: { id: userId } },
      },
    });

    res.status(201).json(newComplaint);
  } catch (err) {
    console.error("❌ Complaint creation failed:", err);
    res.status(500).json({ error: "Failed to save complaint" });
  }
});

// Get all complaints
app.get("/complaints", async (req, res) => {
  try {
    const complaints = await prisma.complaint.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(complaints);
  } catch (err) {
    console.error("❌ Fetch Error:", err);
    res.status(500).json({ error: "Failed to fetch complaints" });
  }
});

// Update complaint status (public route)
app.put("/complaints/:id/status", async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  const allowed = ["Pending", "In Progress", "Resolved"];
  if (!allowed.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    const updated = await prisma.complaint.update({
      where: { id },
      data: { status },
    });
    res.status(200).json(updated);
  } catch (err) {
    console.error("❌ Failed to update status:", err);
    res.status(500).json({ error: "Status update failed" });
  }
});

// -----------------------------
// 🛡️ ADMIN ROUTE
// -----------------------------

// Admin middleware
function requireAdmin(req, res, next) {
  const userId = req.headers["user-id"];
  if (!userId) return res.status(401).json({ message: "Not authorized" });

  prisma.user.findUnique({ where: { id: userId } }).then((user) => {
    if (user?.isAdmin) return next();
    return res.status(403).json({ message: "Access denied: Admins only" });
  });
}

// Admin update complaint (add contact name, status)
app.put("/admin/complaints/:id", requireAdmin, async (req, res) => {
  const { status, contactName } = req.body;

  try {
    const updated = await prisma.complaint.update({
      where: { id: req.params.id },
      data: { status, contactName },
    });

    res.status(200).json(updated);
  } catch (err) {
    console.error("❌ Admin update failed:", err);
    res.status(500).json({ error: "Admin update error" });
  }
});

// -----------------------------
// 🏅 REWARD SYSTEM
// -----------------------------

const getBadge = require("./utils/badge");

app.get("/user/:id/rewards", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const badge = getBadge(user.points);

    res.status(200).json({ points: user.points, badge });
  } catch (err) {
    console.error("Rewards fetch error:", err);
    res.status(500).json({ error: "Failed to fetch rewards" });
  }
});

// -----------------------------
// 🚀 START SERVER
// -----------------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
