// models/Admin.js
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // for login
  },
  password: {
    type: String,
    required: true, // hashed password
  },
  role: {
    type: String,
    default: "super-admin", // optional field
  }
});

module.exports = mongoose.model("Admin", adminSchema);
