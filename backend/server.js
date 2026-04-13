const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: __dirname + '/.env' }); // Make sure we use the right .env path
const cron = require("node-cron");
const fetchSchemes = require("./fetchSchemes");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB connection error:", err));

// Models
const User = require("./models/User");
const Scheme = require("./models/Scheme");

// REGISTER
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ success: false, message: "Username already exists" });
    }
    
    const user = new User({ username, password });
    await user.save();
    res.json({ success: true, message: "User Registered" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Registration failed", error: err.message });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username, password: req.body.password });
    if(user) {
      res.json({success: true, message: "Logged in successfully"});
    } else {
      res.json({success: false, message: "Invalid login credentials"});
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Login failed" });
  }
});

// DYNAMIC FILTERS (Auto-generated from database)
app.get("/filters", async (req, res) => {
  try {
    const genders = await Scheme.distinct("gender");
    const castes = await Scheme.distinct("caste");
    const education = await Scheme.distinct("education");
    
    // Ensure "any" or default options are included, even dynamically
    res.json({
      genders: [...new Set(["any", "Male", "Female", ...genders])],
      castes: [...new Set(["any", "General", "OBC", "SC/ST", ...castes])],
      education: [...new Set(["any", "10th", "12th", "Graduate", "Student", ...education])]
    });
  } catch (err) {
    console.error("Filter extraction error:", err);
    res.status(500).json({ message: "Failed to load dynamic filters" });
  }
});

// FILTER SCHEMES (ML UPGRADE - Score Based Algorithm)
app.post("/getSchemes", async (req, res) => {
  try {
    const { gender, income, caste, education, age } = req.body;
    
    // Convert to appropriate types
    const parsedIncome = income ? parseInt(income) : 0;
    const parsedAge = age ? parseInt(age) : 0;

    // Fetch ALL schemes to apply ML-style scoring
    const allSchemes = await Scheme.find({});
    
    const scoredSchemes = allSchemes.map(scheme => {
      let score = 0;
      
      // 1. Gender Match
      if (scheme.gender === "any" || scheme.gender.toLowerCase() === (gender || "").toLowerCase()) {
        score += 2; // High weight
      }
      
      // 2. Income Match
      if (typeof scheme.income_below === 'number') {
        if (parsedIncome <= scheme.income_below) {
          score += 2;
        }
      } else {
        score += 1; // It's accessible to any income
      }
      
      // 3. Caste Match
      if (scheme.caste === "any" || scheme.caste.toLowerCase() === (caste || "").toLowerCase()) {
        score += 1;
      }

      // 4. Education Match
      if (scheme.education === "any" || scheme.education.toLowerCase() === (education || "").toLowerCase()) {
        score += 1;
      }
      
      // 5. Age Match
      if (parsedAge >= scheme.min_age && parsedAge <= scheme.max_age) {
        score += 2; // Age is generally a strict criteria, so high weight.
      }
      
      return { ...scheme.toObject(), score };
    });
    
    // Sort logic -> higher score is better.
    // If a scheme fundamentally misses a strict criteria, we might want to drop it, but the prompt said:
    // "Instead of strict filter... Sort by score -> recommend top schemes"
    const recommendations = scoredSchemes
        .filter(s => s.score > 0) // minimum viability
        .sort((a, b) => b.score - a.score);

    res.json(recommendations);
  } catch(err) {
    console.error("Fetch schemes error:", err);
    res.status(500).json({ message: "Failed to get schemes" });
  }
});

// Run Auto-fetch job every day at midnight
cron.schedule("0 0 * * *", () => {
  console.log("Triggering scheduled scheme fetch job...");
  fetchSchemes();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
