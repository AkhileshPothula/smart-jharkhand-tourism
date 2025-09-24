const express = require("express");
const router = express.Router();
const { registerGuide,
  loginGuide,
  getGuideProfile,
  updateGuideProfile,
  getApprovedGuides,
  getPendingGuides,} = require("../controllers/guide");

// ✅ Auth
router.post("/register", registerGuide);  // Guide signup
router.post("/login", loginGuide);        // Guide login

// ✅ Profile
router.get("/profile/:id", getGuideProfile);     // Get guide profile
router.put("/profile/:id", updateGuideProfile);  // Update profile

// ✅ Admin approval status
router.get("/approved", getApprovedGuides);       // Get all approved guides
router.get("/pending",getPendingGuides);         // Get pending guides (for admin view)

module.exports = router;
