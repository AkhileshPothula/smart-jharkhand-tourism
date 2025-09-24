const Guide = require("../models/guide");
const bcrypt = require("bcrypt");

// ✅ Register Guide
async function registerGuide(req, res) {
  try {
    const { name, email, password, phone, languages, experience, location } = req.body;

    // Check if guide already exists
    const existingGuide = await Guide.findOne({ email });
    if (existingGuide) return res.status(400).json({ message: "Guide already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newGuide = new Guide({
      name,
      email,
      password: hashedPassword,
      phone,
      languages,
      experience,
      location,
      approved: false, // default: admin approval required
    });

    await newGuide.save();
    res.status(201).json({ message: "Guide registered successfully", guide: newGuide });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ✅ Guide Login
async function loginGuide(req, res) {
  try {
    const { email, password } = req.body;
    const guide = await Guide.findOne({ email });

    if (!guide) return res.status(404).json({ message: "Guide not found" });

    const isMatch = await bcrypt.compare(password, guide.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    res.status(200).json({ message: "Login successful", guide: { id: guide._id, email: guide.email, approved: guide.approved } });
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
