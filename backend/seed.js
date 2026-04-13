const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + '/.env' });
const Scheme = require("./models/Scheme");

const sampleSchemes = [
  {
    scheme_name: "PM Kisan Samman Nidhi",
    gender: "any",
    income_below: 240000,
    caste: "any",
    education: "any",
    benefits: "₹6000/year to vulnerable farmers",
    link: "https://pmkisan.gov.in",
    min_age: 18,
    max_age: 100
  },
  {
    scheme_name: "Sukanya Samriddhi Yojana",
    gender: "Female",
    income_below: 9999999, // practically no strict income limit for basic accounts (simplified)
    caste: "any",
    education: "any",
    benefits: "High-interest savings account for girl child",
    link: "https://www.nsiindia.gov.in/",
    min_age: 0,
    max_age: 10 // girl child below 10
  },
  {
    scheme_name: "Ayushman Bharat",
    gender: "any",
    income_below: 150000, 
    caste: "any",
    education: "any",
    benefits: "Health insurance cover of up to ₹5 lakhs per family per year",
    link: "https://pmjay.gov.in/",
    min_age: 0,
    max_age: 100
  },
  {
    scheme_name: "PM Awas Yojana (PMAY)",
    gender: "any",
    income_below: 300000,
    caste: "any",
    education: "any",
    benefits: "Financial assistance for affordable housing",
    link: "https://pmaymis.gov.in/",
    min_age: 18,
    max_age: 100
  },
  {
    scheme_name: "National Scholarship Portal (Pre-Matric)",
    gender: "any",
    income_below: 250000,
    caste: "SC/ST", // Example representation, though it applies to multiple categories based on specific sub-schemes
    education: "10th",
    benefits: "Scholarship for students studying in classes 1 to 10",
    link: "https://scholarships.gov.in/",
    min_age: 5,
    max_age: 16
  },
  {
    scheme_name: "Post Matric Scholarship",
    gender: "any",
    income_below: 250000,
    caste: "OBC",
    education: "12th",
    benefits: "Financial assistance to students at post-matriculation or post-secondary stage",
    link: "https://scholarships.gov.in/",
    min_age: 15,
    max_age: 30
  },
  {
    scheme_name: "PM Mudra Yojana",
    gender: "any",
    income_below: 9999999,
    caste: "any",
    education: "any",
    benefits: "Loans up to ₹10 lakh to the non-corporate, non-farm small/micro enterprises",
    link: "https://www.mudra.org.in/",
    min_age: 18,
    max_age: 65
  },
  {
    scheme_name: "Maternity Benefit Programme (PMMVY)",
    gender: "Female",
    income_below: 200000,
    caste: "any",
    education: "any",
    benefits: "Cash incentive of ₹5000 in three instalments",
    link: "https://wcd.nic.in/schemes/pradhan-mantri-matru-vandana-yojana",
    min_age: 19,
    max_age: 45
  },
  {
    scheme_name: "Stand Up India",
    gender: "Female", // Women or SC/ST
    income_below: 9999999,
    caste: "SC/ST", 
    education: "Graduate",
    benefits: "Facilitate bank loans between ₹10 lakh and ₹1 Crore to at least one SC/ST borrower and one woman borrower per bank branch",
    link: "https://www.standupmitra.in/",
    min_age: 18,
    max_age: 100
  },
  {
    scheme_name: "PM Shram Yogi Maan-dhan (PM-SYM)",
    gender: "any",
    income_below: 180000, // Monthly income Rs 15000 or below -> ~180000/yr
    caste: "any",
    education: "any",
    benefits: "Assured minimum monthly pension of ₹3000 after attaining the age of 60 years",
    link: "https://maandhan.in/",
    min_age: 18,
    max_age: 40
  },
  // Added extra schemes to meet the >=15 schemes requirement
  {
    scheme_name: "Atal Pension Yojana (APY)",
    gender: "any",
    income_below: 9999999,
    caste: "any",
    education: "any",
    benefits: "Guaranteed minimum pension of ₹1000-₹5000 per month at age 60",
    link: "https://npscra.nsdl.co.in/scheme-details.php",
    min_age: 18,
    max_age: 40
  },
  {
    scheme_name: "PM Jan Dhan Yojana (PMJDY)",
    gender: "any",
    income_below: 9999999,
    caste: "any",
    education: "any",
    benefits: "Zero balance bank accounts, RuPay debit card with an inbuilt ₹1 lakh accident insurance",
    link: "https://pmjdy.gov.in/",
    min_age: 10,
    max_age: 100
  },
  {
    scheme_name: "PM Suraksha Bima Yojana (PMSBY)",
    gender: "any",
    income_below: 9999999,
    caste: "any",
    education: "any",
    benefits: "Accidental Death & Disability Cover of ₹2 Lakhs per year",
    link: "https://www.jansuraksha.gov.in/Files/PMSBY/English/Rules.pdf",
    min_age: 18,
    max_age: 70
  },
  {
    scheme_name: "PM Jeevan Jyoti Bima Yojana (PMJJBY)",
    gender: "any",
    income_below: 9999999,
    caste: "any",
    education: "any",
    benefits: "Life Insurance Cover of ₹2 Lakhs at ₹436/year premium",
    link: "https://www.jansuraksha.gov.in/Files/PMJJBY/English/Rules.pdf",
    min_age: 18,
    max_age: 50
  },
  {
    scheme_name: "PM Ujjwala Yojana",
    gender: "Female",
    income_below: 150000, 
    caste: "any", // Mainly rural / BPL
    education: "any",
    benefits: "Deposit-free LPG connection and subsidies for adult women of BPL families",
    link: "https://www.pmuy.gov.in/",
    min_age: 18,
    max_age: 100
  },
  {
    scheme_name: "National Social Assistance Programme (NSAP)",
    gender: "any",
    income_below: 100000, // BPL indicator
    caste: "any",
    education: "any",
    benefits: "Financial assistance/pensions to the elderly, widows, and persons with disabilities",
    link: "https://nsap.nic.in/",
    min_age: 60,
    max_age: 100
  },
  {
    scheme_name: "PM Kaushal Vikas Yojana (PMKVY)",
    gender: "any",
    income_below: 9999999,
    caste: "any",
    education: "10th",
    benefits: "Free, industry-relevant skill training to help youth secure a better livelihood",
    link: "https://www.pmkvyofficial.org/",
    min_age: 15,
    max_age: 45
  },
  {
    scheme_name: "Deen Dayal Upadhyaya Grameen Kaushalya Yojana",
    gender: "any",
    income_below: 150000, // Rural poor youth focus
    caste: "any",
    education: "12th",
    benefits: "Funding for rural youth training and employment placement",
    link: "http://ddugky.gov.in/",
    min_age: 15,
    max_age: 35
  },
  {
    scheme_name: "Beti Bachao Beti Padhao",
    gender: "Female",
    income_below: 9999999,
    caste: "any",
    education: "any",
    benefits: "Ensures survival, protection, and education of the girl child (awareness and incentive components)",
    link: "https://wcd.nic.in/bbbp-schemes",
    min_age: 0,
    max_age: 18
  },
  {
    scheme_name: "Stand Up India - SC/ST and Women Entrepreneurs",
    gender: "any",
    income_below: 9999999,
    caste: "SC/ST", 
    education: "any",
    benefits: "Loans up to 1 Crore to promote entrepreneurship among targeted demographic",
    link: "https://www.standupmitra.in/",
    min_age: 18,
    max_age: 65
  }
];

mongoose.connect(process.env.MONGO_URI)
.then(async () => {
  console.log("MongoDB Connected for Seeding.");
  
  await Scheme.deleteMany({});
  console.log("Previous schemes deleted.");

  await Scheme.insertMany(sampleSchemes);
  console.log("10 Sample Schemes Inserted Successfully!");

  mongoose.connection.close();
})
.catch(err => {
  console.log("Seeding Error:", err);
  mongoose.connection.close();
});
