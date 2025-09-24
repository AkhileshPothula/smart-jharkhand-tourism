// controllers/adminController.js
const Admin = require("../models/admin");
const Tourist = require("../models/user");
// const Vendor = require("../models/Vendor");
// const Guide = require("../models/Guide");
const bcrypt = require("bcrypt");

// ✅ Admin Login
async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", admin: { email: admin.email, role: admin.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ✅ View All Tourists
async function getAllTourists(req, res) {
  try {
    const tourists = await Tourist.find();
    res.json({ message: "All tourists fetched", tourists });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ✅ View All Vendors
async function getAllVendors(req, res) {
  try {
    const vendors = await Vendor.find();
    res.json({ message: "All vendors fetched", vendors });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ✅ View All Guides
async function getAllGuides(req, res) {
  try {
    const guides = await Guide.find();
    res.json({ message: "All guides fetched", guides });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ✅ Approve Vendor
async function approveVendor(req, res) {
  try {
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.vendorId,
      { approved: true },
      { new: true }
    );
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.json({ message: "Vendor approved successfully", vendor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ✅ Approve Guide
async function approveGuide(req, res) {
  try {
    const guide = await Guide.findByIdAndUpdate(
      req.params.guideId,
      { approved: true },
      { new: true }
    );
    if (!guide) return res.status(404).json({ message: "Guide not found" });
    res.json({ message: "Guide approved successfully", guide });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ✅ Remove Tourist
async function removeTourist(req, res) {
  try {
    const deleted = await Tourist.findByIdAndDelete(req.params.touristId);
    if (!deleted) return res.status(404).json({ message: "Tourist not found" });
    res.json({ message: "Tourist removed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ✅ Export all
module.exports = {
  loginAdmin,
  getAllTourists,
  getAllVendors,
  getAllGuides,
  approveVendor,
  approveGuide,
  removeTourist
};
