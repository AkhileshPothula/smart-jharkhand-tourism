const mongoose = require("mongoose");

const guideSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Guide's full name
  },
  email: {
    type: String,
    required: true,
    unique: true, // Login/contact email
  },
  password: {
    type: String,
    required: true, // For guide login (hashed)
  },
  phone: {
    type: String,
    required: true,
  },
  languages: {
    type: [String], // Languages the guide can speak
    required: true,
  },
  experience: {
    type: Number, // Years of experience
    default: 0,
  },
  location: {
    type: String, // Area/city where the guide operates
  },
  approved: {
    type: Boolean,
    default: false, // Admin approval status
  },
 
},{
    timestamps: true
});

module.exports = mongoose.model("Guide", guideSchema);
