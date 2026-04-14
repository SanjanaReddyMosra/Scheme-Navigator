const axios = require("axios");
const Scheme = require("./models/Scheme");
require("dotenv").config({ path: __dirname + '/.env' });

/**
 * Automates fetching of new schemes from external government sources.
 * Note: Uses a simulated data structure to demonstrate dynamic parsing 
 * of eligibility criteria (gender, age, education).
 */
async function fetchSchemes() {
  try {
    console.log("Starting automated scheme fetch...");
    
    // In a production environment, this would be an official API like 'api.india.gov.in'
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5"); 
    const data = res.data;

    for (let item of data) {
      // Mock parsing logic: Convert placeholder text into meaningful scheme criteria
      const title = item.title.charAt(0).toUpperCase() + item.title.slice(1);
      const isStudentFocused = title.includes("e") || item.body.includes("student");
      const isFemaleFocused = title.includes("a") || item.body.includes("women");

      const schemeData = {
        scheme_name: `PM ${title.split(' ').slice(0, 2).join(' ')} Initiative`,
        gender: isFemaleFocused ? "Female" : "any",
        income_below: Math.floor(Math.random() * 500000) + 100000,
        caste: "any",
        education: isStudentFocused ? "Student" : "any",
        benefits: item.body.substring(0, 150) + "...",
        link: "https://www.india.gov.in/my-government/schemes",
        min_age: Math.floor(Math.random() * 18) + 5,
        max_age: 60
      };

      await Scheme.updateOne(
        { scheme_name: schemeData.scheme_name },
        { $set: schemeData },
        { upsert: true }
      );
    }

    console.log("Dynamic Scheme Update Complete ✅");
  } catch (err) {
    console.error("External Fetch Error:", err.message);
  }
}

module.exports = fetchSchemes;
