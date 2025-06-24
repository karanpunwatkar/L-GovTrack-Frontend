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

// ✅ POST /complaints — Save new complaint
app.post("/complaints", async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Title and description are required" });
  }

  try {
    const complaint = await prisma.complaint.create({
      data: { title, description }
    });

    console.log("✅ Complaint saved:", complaint);
    res.status(201).json({
      message: "Complaint saved to database ✅",
      data: complaint
    });
  } catch (err) {
    console.error("❌ DB Error:", err);
    res.status(500).json({ error: "Failed to save complaint" });
  }
});

// ✅ GET /complaints — Fetch all complaints
app.get("/complaints", async (req, res) => {
  try {
    const complaints = await prisma.complaint.findMany({
      orderBy: { createdAt: "desc" }
    });

    res.status(200).json(complaints);
  } catch (err) {
    console.error("❌ Fetch Error:", err);
    res.status(500).json({ error: "Failed to fetch complaints" });
  }
});

app.get("/complaints", async (req, res) => {
  try {
    const complaints = await prisma.complaint.findMany({
      orderBy: { createdAt: "desc" }
    });
    res.status(200).json(complaints);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch complaints" });
  }
});

app.post("/complaints/:id/comments", async (req, res) => {
  const { content } = req.body;
  const { id } = req.params;

  if (!content) {
    return res.status(400).json({ error: "Comment content is required" });
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        complaintId: id
      }
    });

    res.status(201).json(comment);
  } catch (err) {
    console.error("❌ Error posting comment:", err);
    res.status(500).json({ error: "Failed to post comment" });
  }
});

app.get("/complaints/:id/comments", async (req, res) => {
  const { id } = req.params;

  try {
    const comments = await prisma.comment.findMany({
      where: { complaintId: id },
      orderBy: { createdAt: "desc" }
    });

    res.status(200).json(comments);
  } catch (err) {
    console.error("❌ Error getting comments:", err);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

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
      data: { status }
    });
    res.status(200).json(updated);
  } catch (err) {
    console.error("❌ Failed to update status:", err);
    res.status(500).json({ error: "Status update failed" });
  }
});

// PATCH /complaints/:id — update status
app.patch("/complaints/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await prisma.complaint.update({
      where: { id },
      data: { status }
    });

    res.json(updated);
  } catch (err) {
    console.error("❌ Status update failed:", err);
    res.status(500).json({ error: "Failed to update status" });
  }
});

app.post("/login", async (req, res) => {
  const { email } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user); // ✅ Must return the full user object
});

app.post("/login", async (req, res) => {
  const { email } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user); // ✅ Must return the full user object
});


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

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
