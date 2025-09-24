const express = require("express");
const router = express.Router();
const { registerVendor,
  loginVendor,
  getVendorProfile,
  updateVendorProfile,
  getApprovedVendors,
  getPendingVendors,}= require("../controllers/vendor");

// ✅ Auth
router.post("/register", registerVendor);  // Vendor signup
router.post("/login", loginVendor);        // Vendor login

// ✅ Profile
router.get("/profile/:id",getVendorProfile);     // Get vendor profile
router.put("/profile/:id", updateVendorProfile);  // Update profile

// ✅ Admin approval status
router.get("/approved", getApprovedVendors);       // Get all approved vendors
router.get("/pending", getPendingVendors);         // Get pending vendors (for admin view)

module.exports = router;
