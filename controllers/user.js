// controllers/touristController.js

// ✅ Auth
async function registerTourist(req, res) {
  try {
    const { name, email, password, phone } = req.body;
    // TODO: Save to DB
    res.status(201).json({ message: "Tourist registered successfully", data: { name, email, phone } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function loginTourist(req, res) {
  try {
    const { email, password } = req.body;
    // TODO: Validate credentials
    res.json({ message: "Tourist logged in", email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ✅ Profile
async function getTouristProfile(req, res) {
  try {
    const touristId = req.params.id;
    // TODO: Fetch from DB
    res.json({ message: "Tourist profile fetched", touristId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateTouristProfile(req, res) {
  try {
    const touristId = req.params.id;
    const updates = req.body;
    // TODO: Update DB
    res.json({ message: "Tourist profile updated", touristId, updates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ✅ Bookings
async function createBooking(req, res) {
  try {
    const touristId = req.params.id;
    const booking = req.body;
    // TODO: Save booking to DB
    res.status(201).json({ message: "Booking created", touristId, booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getBookings(req, res) {
  try {
    const touristId = req.params.id;
    // TODO: Fetch bookings from DB
    res.json({ message: "All bookings fetched", touristId, bookings: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateBooking(req, res) {
  try {
    const { id, bookingId } = req.params;
    const updates = req.body;
    // TODO: Update booking in DB
    res.json({ message: "Booking updated", touristId: id, bookingId, updates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function cancelBooking(req, res) {
  try {
    const { id, bookingId } = req.params;
    // TODO: Cancel booking in DB
    res.json({ message: "Booking cancelled", touristId: id, bookingId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ✅ Wallet
async function getWallet(req, res) {
  try {
    const touristId = req.params.id;
    // TODO: Fetch wallet from DB
    res.json({ message: "Wallet fetched", touristId, balance: 0, transactions: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function addFunds(req, res) {
  try {
    const touristId = req.params.id;
    const { amount } = req.body;
    // TODO: Update wallet in DB
    res.json({ message: "Funds added", touristId, amount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function makeTransaction(req, res) {
  try {
    const touristId = req.params.id;
    const transaction = req.body;
    // TODO: Save transaction in DB
    res.json({ message: "Transaction processed", touristId, transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ✅ Reviews
async function addReview(req, res) {
  try {
    const touristId = req.params.id;
    const review = req.body;
    // TODO: Save review in DB
    res.status(201).json({ message: "Review added", touristId, review });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getReviews(req, res) {
  try {
    const touristId = req.params.id;
    // TODO: Fetch reviews from DB
    res.json({ message: "All reviews fetched", touristId, reviews: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ✅ Export all at once
module.exports = {
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
};
