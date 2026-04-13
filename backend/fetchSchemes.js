const axios = require("axios");
const Scheme = require("./models/Scheme");
require("dotenv").config({ path: __dirname + '/.env' });

async function fetchSchemes() {
  try {
    // Replace with real API later, or a mock URL holding standard schemas.
    // For now we will fetch from a mock endpoint or bypass logic if it fails.
    // Using a mock URL that returns empty or throwing error if it doesn't exist yet, 
    // but demonstrating the structure exactly as requested.
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts"); // mock API, returns posts

    // As an example, we loop through and parse data creatively if needed
    // However, the requested logic specifically handles expected government API data:
    // For this demonstration, let's treat the incoming array specifically if it matches scheme structure:
    const data = res.data;

    for (let scheme of data) {
      if (!scheme.title) continue; // Safety check

      let gender = "any";
      let education = "any";
      let description = scheme.body || "";

      if (description.toLowerCase().includes("women") || scheme.title.toLowerCase().includes("women")) {
        gender = "Female";
      }

      if (description.toLowerCase().includes("student") || description.toLowerCase().includes("school")) {
        education = "Student";
      }

      await Scheme.updateOne(
        { scheme_name: scheme.title.substring(0, 50) }, // Use title as scheme_name
        {
          $set: {
            scheme_name: scheme.title.substring(0, 50),
            gender,
            income_below: scheme.income || 500000,
            caste: "any",
            education,
            benefits: description.substring(0, 200),
            link: "https://example.gov.in/" + scheme.id,
            min_age: 18,
            max_age: 60
          }
        },
        { upsert: true }
      );
    }

    console.log("Schemes Updated Automatically from External Source ✅");
  } catch (err) {
    console.error("Auto Fetch Schemes Error:", err.message);
  }
}

module.exports = fetchSchemes;
