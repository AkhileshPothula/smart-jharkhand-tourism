const express = require("express");
const router = express.Router();

// Tourist Controller
const {
  registerTourist,
  loginTourist,
  getTouristProfile,
  updateTouristProfile,
  createBooking,
  getBookings,
  updateBooking,
  cancelBooking,
  getWallet,
  addFunds,
  makeTransaction,
  addReview,
  getReviews
} = require("../controllers/user");

// ✅ Auth
// Get tourist profile
router.post("/register", registerTourist);   // Register a new tourist
router.post("/login",loginTourist);         // Login

// ✅ Profile
router.get("/:id", getTouristProfile);       // Get tourist profile
router.put("/:id",updateTouristProfile);    // Update profile

// ✅ Bookings
router.post("/:id/bookings",createBooking); // Create booking
router.get("/:id/bookings",getBookings);    // Get all bookings
router.put("/:id/bookings/:bookingId", updateBooking); // Update booking
router.delete("/:id/bookings/:bookingId", cancelBooking); // Cancel booking

// ✅ Wallet
router.get("/:id/wallet",getWallet);        // View wallet balance
router.post("/:id/wallet/topup",addFunds);  // Add money
router.post("/:id/wallet/transaction", makeTransaction); // Debit/Credit

// ✅ Reviews
router.post("/:id/reviews", addReview);      // Add review
router.get("/:id/reviews",getReviews);      // Get reviews by tourist

module.exports = router;
