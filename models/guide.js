const mongoose = require("mongoose");

const guideSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  phone: String,
  role: { type: String, enum: ["Tourist", "Guide", "Admin", "Vendor"], default: "Guide" },
  bio: { type: String, maxlength: 500 },
  languages: [{ type: String }], // e.g., ["English", "Hindi", "Santali"]
  certifications: [{ type: String }],
  experience: { type: Number, default: 0 }, // Years of experience
  // You can add more fields specific to guides here
}, { timestamps: true });

module.exports = mongoose.model("Guide", guideSchema);
