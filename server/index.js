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

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
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

