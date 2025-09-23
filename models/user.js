const mongoose = require("mongoose");

const touristSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  phone: String,

  languagePreference: {
    type: String,
    enum: ["English", "Hindi", "Santali", "Ho", "Bengali"],
    default: "English"
  },

  preferences: {
    interests: [String], // e.g., ["wildlife", "heritage", "adventure"]
    budgetRange: {
      min: Number,
      max: Number
    }
  },

  bookings: [
    {
      bookingId: String,
      type: { type: String, enum: ["hotel", "transport", "guide", "event"] },
      date: Date,
      status: { type: String, enum: ["confirmed", "pending", "cancelled"], default: "pending" }
    }
  ],

  wallet: {
    balance: { type: Number, default: 0 },
    transactions: [
      {
        txnId: String,
        amount: Number,
        type: { type: String, enum: ["credit", "debit"] },
        date: { type: Date, default: Date.now },
        status: { type: String, enum: ["success", "failed", "pending"], default: "success" }
      }
    ]
  },

  reviews: [
    {
      placeId: String,
      rating: { type: Number, min: 1, max: 5 },
      comment: String,
      date: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Tourist", touristSchema);
