const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Vendor's full name
  },
  email: {
    type: String,
    required: true,
    unique: true, // Login/contact email
  },
  password: {
    type: String,
    required: true, // For vendor login (hashed)
  },
  phone: {
    type: String,
    required: true, // Contact number
  },
  serviceType: {
    type: String,
    required: true, // e.g., Homestay, Transport, Food, Travel Agency
  },
  location: {
    type: String, // City or area of service
  },
  approved: {
    type: Boolean,
    default: false, // Admin approval status
  },

},{
    timestamps: true
});

module.exports = mongoose.model("Vendor", vendorSchema);
