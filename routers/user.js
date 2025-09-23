const express = require("express");
const router = express.Router();

// Tourist Controller
const touristController = require("../controllers/touristController");

// ✅ Auth
router.post("/register", touristController.registerTourist);   // Register a new tourist
router.post("/login", touristController.loginTourist);         // Login

// ✅ Profile
router.get("/:id", touristController.getTouristProfile);       // Get tourist profile
router.put("/:id", touristController.updateTouristProfile);    // Update profile

// ✅ Bookings
router.post("/:id/bookings", touristController.createBooking); // Create booking
router.get("/:id/bookings", touristController.getBookings);    // Get all bookings
router.put("/:id/bookings/:bookingId", touristController.updateBooking); // Update booking
router.delete("/:id/bookings/:bookingId", touristController.cancelBooking); // Cancel booking

// ✅ Wallet
router.get("/:id/wallet", touristController.getWallet);        // View wallet balance
router.post("/:id/wallet/topup", touristController.addFunds);  // Add money
router.post("/:id/wallet/transaction", touristController.makeTransaction); // Debit/Credit

// ✅ Reviews
router.post("/:id/reviews", touristController.addReview);      // Add review
router.get("/:id/reviews", touristController.getReviews);      // Get reviews by tourist

module.exports = router;
