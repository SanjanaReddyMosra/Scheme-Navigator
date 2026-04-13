const mongoose = require("mongoose");

const schemeSchema = new mongoose.Schema({
  scheme_name: String,
  gender: String, // 'Male', 'Female', 'any'
  income_below: Number,
  caste: String,  // 'General', 'SC/ST', 'OBC', 'any'
  education: String, // 'None', '10th', '12th', 'Graduate', 'any'
  benefits: String,
  link: String,
  min_age: { type: Number, default: 0 },
  max_age: { type: Number, default: 100 }
});

module.exports = mongoose.model("Scheme", schemeSchema);
