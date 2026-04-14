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
    benefits: "₹6000 per year directly to farmer bank accounts in three installments.",
    link: "https://pmkisan.gov.in",
    min_age: 18,
    max_age: 100
  },
  {
    scheme_name: "Ayushman Bharat (PM-JAY)",
    gender: "any",
    income_below: 150000, 
    caste: "any",
    education: "any",
    benefits: "Health insurance cover of up to ₹5 lakhs per family per year for secondary and tertiary care.",
    link: "https://pmjay.gov.in/",
    min_age: 0,
    max_age: 100
  },
  {
    scheme_name: "Sukanya Samriddhi Yojana",
    gender: "Female",
    income_below: 9999999,
    caste: "any",
    education: "any",
    benefits: "High-interest savings scheme for a girl child's education and marriage expenses.",
    link: "https://www.nsiindia.gov.in/",
    min_age: 0,
    max_age: 10
  },
  {
    scheme_name: "PM Awas Yojana (Urban)",
    gender: "any",
    income_below: 300000,
    caste: "any",
    education: "any",
    benefits: "Financial assistance for house construction with subsidies on interest rates.",
    link: "https://pmaymis.gov.in/",
    min_age: 18,
    max_age: 100
  },
  {
    scheme_name: "PM Mudra Yojana",
    gender: "any",
    income_below: 9999999,
    caste: "any",
    education: "any",
    benefits: "Loans up to ₹10 lakh to start or expand micro enterprises without collateral.",
    link: "https://www.mudra.org.in/",
    min_age: 18,
    max_age: 65
  },
  {
    scheme_name: "PM Ujjwala Yojana 2.0",
    gender: "Female",
    income_below: 180000,
    caste: "any",
    education: "any",
    benefits: "Free LPG connections provided to adult women from BPL families.",
    link: "https://www.pmuy.gov.in/",
    min_age: 18,
    max_age: 100
  },
  {
    scheme_name: "Atal Pension Yojana",
    gender: "any",
    income_below: 9999999,
    caste: "any",
    education: "any",
    benefits: "Guaranteed monthly pension between ₹1,000 to ₹5,000 for workers in the unorganized sector.",
    link: "https://www.npscra.nsdl.co.in/",
    min_age: 18,
    max_age: 40
  },
  {
    scheme_name: "PM Matru Vandana Yojana",
    gender: "Female",
    income_below: 250000,
    caste: "any",
    education: "any",
    benefits: "₹5000 cash incentive for pregnant and lactating women for the first living child.",
    link: "https://wcd.nic.in/pmmvy",
    min_age: 19,
    max_age: 45
  },
  {
    scheme_name: "Stand Up India",
    gender: "any",
    income_below: 9999999,
    caste: "SC/ST", 
    education: "any",
    benefits: "Bank loans between ₹10 lakh and ₹1 crore to SC/ST or Women entrepreneurs.",
    link: "https://www.standupmitra.in/",
    min_age: 18,
    max_age: 100
  },
  {
    scheme_name: "PM Shram Yogi Maan-dhan",
    gender: "any",
    income_below: 180000,
    caste: "any",
    education: "any",
    benefits: "Min monthly pension of ₹3,000 for unorganized sector workers after age 60.",
    link: "https://maandhan.in/",
    min_age: 18,
    max_age: 40
  },
  {
    scheme_name: "PM Jan Dhan Yojana",
    gender: "any",
    income_below: 9999999,
    caste: "any",
    education: "any",
    benefits: "Universal access to banking with insurance cover and overdraft facility.",
    link: "https://pmjdy.gov.in/",
    min_age: 10,
    max_age: 100
  },
  {
    scheme_name: "PM Suraksha Bima Yojana",
    gender: "any",
    income_below: 9999999,
    caste: "any",
    education: "any",
    benefits: "Accidental death and disability insurance at a low premium of ₹20/year.",
    link: "https://jansuraksha.gov.in/",
    min_age: 18,
    max_age: 70
  },
  {
    scheme_name: "National Scholarship Portal",
    gender: "any",
    income_below: 250000,
    caste: "any",
    education: "Student",
    benefits: "Single portal for all scholarship schemes across central and state departments.",
    link: "https://scholarships.gov.in/",
    min_age: 5,
    max_age: 25
  },
  {
    scheme_name: "PM Kaushal Vikas Yojana",
    gender: "any",
    income_below: 9999999,
    caste: "any",
    education: "10th",
    benefits: "Skill certification scheme to enable youth to take up industry-relevant training.",
    link: "https://www.pmkvyofficial.org/",
    min_age: 15,
    max_age: 45
  },
  {
    scheme_name: "Beti Bachao Beti Padhao",
    gender: "Female",
    income_below: 9999999,
    caste: "any",
    education: "any",
    benefits: "Awareness campaign to address the declining sex ratio and promote girl education.",
    link: "https://wcd.nic.in/bbbp-schemes",
    min_age: 0,
    max_age: 18
  },
  {
    scheme_name: "PM SVANidhi",
    gender: "any",
    income_below: 200000,
    caste: "any",
    education: "any",
    benefits: "Working capital loan up to ₹10,000 for street vendors affected by the pandemic.",
    link: "https://pmsvanidhi.mohua.gov.in/",
    min_age: 18,
    max_age: 100
  },
  {
    scheme_name: "Janani Suraksha Yojana",
    gender: "Female",
    income_below: 150000,
    caste: "any",
    education: "any",
    benefits: "Cash assistance for institutional delivery to reduce maternal and neonatal mortality.",
    link: "https://nhm.gov.in/",
    min_age: 19,
    max_age: 45
  },
  {
    scheme_name: "PM Vishwakarma Yojana",
    gender: "any",
    income_below: 500000,
    caste: "OBC",
    education: "any",
    benefits: "Support for artisans and craftspeople through credit, training, and toolkit incentives.",
    link: "https://pmvishwakarma.gov.in/",
    min_age: 18,
    max_age: 100
  },
  {
    scheme_name: "National Career Service",
    gender: "any",
    income_below: 9999999,
    caste: "any",
    education: "Graduate",
    benefits: "Gateway for job searching, career counseling, and vocational training services.",
    link: "https://www.ncs.gov.in/",
    min_age: 15,
    max_age: 60
  },
  {
    scheme_name: "PM-EBus Sewa",
    gender: "any",
    income_below: 9999999,
    caste: "any",
    education: "any",
    benefits: "Deployment of 10,000 e-buses in cities for green public transport infrastructure.",
    link: "https://mohua.gov.in/",
    min_age: 18,
    max_age: 100
  },
  {
    scheme_name: "Saubhagya Yojana",
    gender: "any",
    income_below: 150000,
    caste: "any",
    education: "any",
    benefits: "Universal access to electricity to all households across the country.",
    link: "https://saubhagya.gov.in/",
    min_age: 18,
    max_age: 100
  },
  {
    scheme_name: "Ujala Scheme",
    gender: "any",
    income_below: 9999999,
    caste: "any",
    education: "any",
    benefits: "Distribution of efficient LED bulbs to reduce electricity bills and carbon emissions.",
    link: "http://www.ujala.gov.in/",
    min_age: 18,
    max_age: 100
  },
  {
    scheme_name: "Digital India Internship",
    gender: "any",
    income_below: 9999999,
    caste: "any",
    education: "Graduate",
    benefits: "Opportunity for students to work under MeitY and experience the Digital India ecosystem.",
    link: "https://meity.gov.in/internship-scheme",
    min_age: 18,
    max_age: 26
  }
];

mongoose.connect(process.env.MONGO_URI)
.then(async () => {
  console.log("MongoDB Connected for Seeding.");
  
  await Scheme.deleteMany({});
  console.log("Previous schemes deleted.");

  await Scheme.insertMany(sampleSchemes);
  console.log("All sample schemes inserted successfully!");

  mongoose.connection.close();
})
.catch(err => {
  console.log("Seeding Error:", err);
  mongoose.connection.close();
});
