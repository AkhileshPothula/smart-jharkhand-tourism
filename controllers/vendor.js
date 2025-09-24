const Vendor = require("../models/vendor");
const bcrypt = require("bcrypt");

// ✅ Register Vendor
async function registerVendor(req, res) {
  try {
    const { name, email, password, phone, serviceType, location } = req.body;

    // Check if vendor already exists
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) return res.status(400).json({ message: "Vendor already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newVendor = new Vendor({
      name,
      email,
      password: hashedPassword,
      phone,
      serviceType,
      location,
      approved: false, // default: admin approval required
    });

    await newVendor.save();
    res.status(201).json({ message: "Vendor registered successfully", vendor: newVendor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ✅ Vendor Login
async function loginVendor(req, res) {
  try {
    const { email, password } = req.body;
    const vendor = await Vendor.findOne({ email });

    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    res.status(200).json({ message: "Login successful", vendor: { id: vendor._id, email: vendor.email, approved: vendor.approved } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ✅ Get Vendor Profile
async function getVendorProfile(req, res) {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    res.json({ message: "Vendor profile fetched", vendor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ✅ Update Vendor Profile
async function updateVendorProfile(req, res) {
  try {
    const updates = req.body;

    // If password is being updated, hash it
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const vendor = await Vendor.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    res.json({ message: "Vendor profile updated", vendor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ✅ Get all approved vendors
async function getApprovedVendors(req, res) {
  try {
    const vendors = await Vendor.find({ approved: true });
    res.json({ message: "Approved vendors fetched", vendors });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ✅ Get all pending approval vendors (for admin view)
async function getPendingVendors(req, res) {
  try {
    const vendors = await Vendor.find({ approved: false });
    res.json({ message: "Pending vendors fetched", vendors });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ✅ Export all controllers
module.exports = {
  registerVendor,
  loginVendor,
  getVendorProfile,
  updateVendorProfile,
  getApprovedVendors,
  getPendingVendors,
};
