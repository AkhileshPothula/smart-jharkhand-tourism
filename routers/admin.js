// routers/admin.js
const express = require("express");
const router = express.Router();
const {loginAdmin,
  getAllTourists,
  getAllVendors,
  getAllGuides,
  approveVendor,
  approveGuide,
  removeTourist} = require("../controllers/admin");

// ✅ Login route only
router.post("/login", loginAdmin);

// ✅ View data
router.get("/tourists", getAllTourists);
router.get("/vendors", getAllVendors);
router.get("/guides", getAllGuides);

// ✅ Approve / Remove actions
router.post("/approve/vendor/:vendorId", approveVendor);
router.post("/approve/guide/:guideId",approveGuide);
router.delete("/remove/tourist/:touristId", removeTourist);

module.exports = router;
