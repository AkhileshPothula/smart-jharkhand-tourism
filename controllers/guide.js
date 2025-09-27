const Guide = require("../models/guide");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretjwtkey"; // Use environment variable
const JWT_EXPIRATION = "1h"; // Token expires in 1 hour

// ================= AUTH =================

// Register new guide
async function registerGuide(req, res) {
  try {
    const { firstName, lastName, email, password, phone, role, bio, languages, certifications, experience } = req.body;

    const existing = await Guide.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const guide = new Guide({ firstName, lastName, email, password: hashedPassword, phone, role, bio, languages, certifications, experience });
    const saved = await guide.save();

    const token = jwt.sign({ id: saved._id, role: saved.role }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    res.status(201).json({ message: "Guide registered successfully", data: { id: saved._id, firstName: saved.firstName, lastName: saved.lastName, email: saved.email, role: saved.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Login
async function loginGuide(req, res) {
  try {
    const { email, password } = req.body;
    const guide = await Guide.findOne({ email });

    if (!guide) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, guide.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: guide._id, role: guide.role }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    res.json({ message: "Login successful", data: { id: guide._id, firstName: guide.firstName, lastName: guide.lastName, email: guide.email, role: guide.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ✅ Get Guide Profile
async function getGuideProfile(req, res) {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) return res.status(404).json({ message: "Guide not found" });

    res.json({ message: "Guide profile fetched", guide });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ✅ Update Guide Profile
async function updateGuideProfile(req, res) {
  try {
    const updates = req.body;

    // If password is being updated, hash it
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const guide = await Guide.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!guide) return res.status(404).json({ message: "Guide not found" });

    res.json({ message: "Guide profile updated", guide });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ✅ Get all approved guides
async function getApprovedGuides(req, res) {
  try {
    const guides = await Guide.find({ approved: true });
    res.json({ message: "Approved guides fetched", guides });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ✅ Get all pending approval guides (for admin view)
async function getPendingGuides(req, res) {
  try {
    const guides = await Guide.find({ approved: false });
    res.json({ message: "Pending guides fetched", guides });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ✅ Export all controllers
module.exports = {
  registerGuide,
  loginGuide,
  getGuideProfile,
  updateGuideProfile,
  getApprovedGuides,
  getPendingGuides,
};
