// controllers/touristController.js
const Tourist = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretjwtkey"; // Use environment variable
const JWT_EXPIRATION = "1h"; // Token expires in 1 hour

// ================= AUTH =================

// Register new tourist
async function registerTourist(req, res) {
  try {
    const { firstName, lastName, email, password, phone, role } = req.body;

    const existing = await Tourist.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const tourist = new Tourist({ firstName, lastName, email, password: hashedPassword, phone, role });
    const saved = await tourist.save();

    const token = jwt.sign({ id: saved._id, role: saved.role }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000, // 1 hour
    });

    res.status(201).json({ message: "Tourist registered successfully", data: { id: saved._id, firstName: saved.firstName, lastName: saved.lastName, email: saved.email, role: saved.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Login
async function loginTourist(req, res) {
  try {
    const { email, password } = req.body;
    const tourist = await Tourist.findOne({ email });

    if (!tourist) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, tourist.password); // Compare hashed passwords
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: tourist._id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000, // 1 hour
    });

    res.json({ message: "Login successful", data: { id: tourist._id, name: tourist.name, email: tourist.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ================= PROFILE =================

// Get profile
async function getTouristProfile(req, res) {
  try {
    const tourist = await Tourist.findById(req.params.id);
    if (!tourist) return res.status(404).json({ message: "Tourist not found" });

    res.json({ message: "Tourist profile fetched", data: tourist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update profile
async function updateTouristProfile(req, res) {
  try {
    const updated = await Tourist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Tourist not found" });

    res.json({ message: "Profile updated", data: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ================= BOOKINGS =================

// Create booking
async function createBooking(req, res) {
  try {
    const tourist = await Tourist.findById(req.params.id);
    if (!tourist) return res.status(404).json({ message: "Tourist not found" });

    tourist.bookings.push(req.body);
    await tourist.save();

    res.status(201).json({ message: "Booking created", bookings: tourist.bookings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get all bookings
async function getBookings(req, res) {
  try {
    const tourist = await Tourist.findById(req.params.id);
    if (!tourist) return res.status(404).json({ message: "Tourist not found" });

    res.json({ message: "All bookings fetched", bookings: tourist.bookings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update booking
async function updateBooking(req, res) {
  try {
    const tourist = await Tourist.findById(req.params.id);
    if (!tourist) return res.status(404).json({ message: "Tourist not found" });

    const booking = tourist.bookings.id(req.params.bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    Object.assign(booking, req.body);
    await tourist.save();

    res.json({ message: "Booking updated", booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Cancel booking
async function cancelBooking(req, res) {
  try {
    const tourist = await Tourist.findById(req.params.id);
    if (!tourist) return res.status(404).json({ message: "Tourist not found" });

    tourist.bookings = tourist.bookings.filter(b => b._id.toString() !== req.params.bookingId);
    await tourist.save();

    res.json({ message: "Booking cancelled", bookings: tourist.bookings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ================= WALLET =================

// Get wallet
async function getWallet(req, res) {
  try {
    const tourist = await Tourist.findById(req.params.id);
    if (!tourist) return res.status(404).json({ message: "Tourist not found" });

    res.json({ message: "Wallet fetched", wallet: tourist.wallet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Add funds
async function addFunds(req, res) {
  try {
    const tourist = await Tourist.findById(req.params.id);
    if (!tourist) return res.status(404).json({ message: "Tourist not found" });

    const { amount } = req.body;
    tourist.wallet.balance += amount;
    tourist.wallet.transactions.push({ amount, type: "credit" });
    await tourist.save();

    res.json({ message: "Funds added", wallet: tourist.wallet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Make transaction
async function makeTransaction(req, res) {
  try {
    const tourist = await Tourist.findById(req.params.id);
    if (!tourist) return res.status(404).json({ message: "Tourist not found" });

    const { amount } = req.body;
    if (tourist.wallet.balance < amount) return res.status(400).json({ message: "Insufficient balance" });

    tourist.wallet.balance -= amount;
    tourist.wallet.transactions.push({ amount, type: "debit" });
    await tourist.save();

    res.json({ message: "Transaction successful", wallet: tourist.wallet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ================= REVIEWS =================

// Add review
async function addReview(req, res) {
  try {
    const tourist = await Tourist.findById(req.params.id);
    if (!tourist) return res.status(404).json({ message: "Tourist not found" });

    tourist.reviews.push(req.body);
    await tourist.save();

    res.status(201).json({ message: "Review added", reviews: tourist.reviews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get reviews
async function getReviews(req, res) {
  try {
    const tourist = await Tourist.findById(req.params.id);
    if (!tourist) return res.status(404).json({ message: "Tourist not found" });

    res.json({ message: "All reviews fetched", reviews: tourist.reviews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Logout
async function logoutTourist(req, res) {
  try {
    res.clearCookie("token");
    res.json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ✅ Export All
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
  getReviews,
  logoutTourist,
};
