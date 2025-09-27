const express = require("express");
const router = express.Router();
const { registerGuide, loginGuide } = require("../controllers/guide");

// ✅ Auth
router.post("/register", registerGuide);
router.post("/login", loginGuide);

module.exports = router;
