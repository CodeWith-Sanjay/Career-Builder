const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const db = require("./db"); // Database connection

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

// Admin Login
app.post("/AdminLogin", (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM admin WHERE email = ?";

    db.query(sql, [email], (err, result) => {
        if (err) return res.status(500).json({ error: err });

        if (result.length === 0) return res.status(401).json({ message: "Admin not found" });

        const admin = result[0];

        if (password !== admin.password) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const token = jwt.sign({ adminId: admin.id }, "secret_key", { expiresIn: "1h" });
        res.json({ message: "Login successful", token });
    });
});

// ==================== JOB APPLICANT ROUTES ====================

// Job Applicant Register
app.post("/JobApplicantRegister", async (req, res) => {
    try {
        const { applicant_email, applicant_password, confirmPassword } = req.body;

        if (applicant_password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const sqlCheck = "SELECT * FROM jobapplicants WHERE applicant_email = ?";
        db.query(sqlCheck, [applicant_email], async (err, result) => {
            if (err) return res.status(500).json({ error: "Database error" });

            if (result.length > 0) {
                return res.status(400).json({ message: "Email already registered" });
            }

            const hashedPassword = await bcrypt.hash(applicant_password, 10);

            const sqlInsert = "INSERT INTO jobapplicants (applicant_email, applicant_password) VALUES (?, ?)";
            db.query(sqlInsert, [applicant_email, hashedPassword], (err, result) => {
                if (err) return res.status(500).json({ error: "Database error" });

                res.status(201).json({ message: "Registration successful" });
            });
        });
    } catch (error) {
        res.status(500).json({ error: "Unexpected error occurred" });
    }
});

// Job Applicant Login
app.post("/JobApplicantLogin", (req, res) => {
    const { applicant_email, applicant_password } = req.body;
    const sql = "SELECT * FROM jobapplicants WHERE applicant_email = ?";

    db.query(sql, [applicant_email], async (err, result) => {
        if (err) return res.status(500).json({ error: err });

        if (result.length === 0) {
            return res.status(401).json({ message: "User not found" });
        }

        const user = result[0];

        const isMatch = await bcrypt.compare(applicant_password, user.applicant_password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // const token = jwt.sign({ userId: user.applicant_id }, "secret_key", { expiresIn: "1h" });
        const token = jwt.sign(
            {
              userId: user.applicant_id,
              email: user.applicant_email // ✅ this adds email to the token
            },
            "secret_key",
            { expiresIn: "1h" }
          );
        res.json({ message: "Login successful", token });
    });
});

// ==================== COMPANY ROUTES ====================

// Company Register
app.post("/CompanyRegister", async (req, res) => {
    try {
        const { company_email, company_password, confirmPassword } = req.body;

        if (company_password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const sqlCheck = "SELECT * FROM company WHERE company_email = ?";
        db.query(sqlCheck, [company_email], async (err, result) => {
            if (err) return res.status(500).json({ error: "Database error while checking email" });

            if (result.length > 0) {
                return res.status(400).json({ message: "Email already registered" });
            }

            const hashedPassword = await bcrypt.hash(company_password, 10);

            const sqlInsert = "INSERT INTO company (company_email, company_password) VALUES (?, ?)";
            db.query(sqlInsert, [company_email, hashedPassword], (err, result) => {
                if (err) return res.status(500).json({ error: "Database error while inserting data" });

                res.status(201).json({ message: "Registration successful" });
            });
        });
    } catch (error) {
        res.status(500).json({ error: "Unexpected error occurred" });
    }
});

// Company Login
app.post("/CompanyLogin", (req, res) => {
    const { company_email, company_password } = req.body;
    const sql = "SELECT * FROM company WHERE company_email = ?";

    db.query(sql, [company_email], async (err, result) => {
        if (err) return res.status(500).json({ error: "Database error while checking user" });

        if (result.length === 0) {
            return res.status(401).json({ message: "User not found" });
        }

        const company = result[0];

        const isMatch = await bcrypt.compare(company_password, company.company_password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const token = jwt.sign({ companyId: company.company_id }, "secret_key", { expiresIn: "1h" });
        res.json({ message: "Login successful", token });
    });
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) return res.status(403).json({ message: "No token provided" });
  
    jwt.verify(token, "secret_key", (err, user) => {
      if (err) return res.status(401).json({ message: "Invalid token" });
  
      req.user = user; // ✅ This will now include email
      next();
    });
  };

// ✅ Save or Update Job Applicant Details
app.post("/saveApplicantDetails", verifyToken, upload.single("resume_file"), (req, res) => {
    const {
      full_name,
      phone,
      location,
      linkedin,
      portfolio,
      job_title,
      company,
      start_date,
      end_date,
      responsibilities,
      degree,
      university,
      graduation_year,
      skills,
      certification_name,
      issuing_organization,
      certification_date,
      project_name,
      project_link,
      project_description,
      github,
      behance
    } = req.body;
  
    const resume_file = req.file ? req.file.filename : null;
    const userEmail = req.user.email;
  
    const sql = `
  INSERT INTO job_applicants_info 
  (applicant_email, full_name, phone, location, linkedin, portfolio, 
  job_title, company, start_date, end_date, responsibilities, degree, 
  university, graduation_year, skills, certification_name, issuing_organization, 
  certification_date, project_name, project_link, project_description, 
  resume_file, github, behance)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE
  full_name = VALUES(full_name), phone = VALUES(phone), location = VALUES(location),
  linkedin = VALUES(linkedin), portfolio = VALUES(portfolio), job_title = VALUES(job_title),
  company = VALUES(company), start_date = VALUES(start_date), end_date = VALUES(end_date),
  responsibilities = VALUES(responsibilities), degree = VALUES(degree),
  university = VALUES(university), graduation_year = VALUES(graduation_year),
  skills = VALUES(skills), certification_name = VALUES(certification_name),
  issuing_organization = VALUES(issuing_organization), certification_date = VALUES(certification_date),
  project_name = VALUES(project_name), project_link = VALUES(project_link),
  project_description = VALUES(project_description), resume_file = VALUES(resume_file),
  github = VALUES(github), behance = VALUES(behance)
`;
  
    const values = [
      userEmail, full_name, phone, location, linkedin, portfolio,
      job_title || null, company || null, start_date || null, end_date || null, responsibilities || null,
      degree, university, graduation_year || null, skills,
      certification_name, issuing_organization, certification_date || null,
      project_name, project_link, project_description,
      resume_file, github, behance
    ];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error saving profile:", err);
        return res.status(500).json({ message: "Database error" });
      }
      res.status(200).json({ message: "Profile saved successfully!" });
    });
  });

// ✅ Fetch Job Applicant Details (After Login)
app.get("/getApplicantDetails", verifyToken, (req, res) => {
    const email = req.user.email; // This assumes req.user.email contains the authenticated user's email
    const sql = "SELECT * FROM job_applicants_info WHERE applicant_email = ?";

    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error("Error fetching data:", err);
            return res.status(500).json({ error: "Database query failed" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "No applicant found" });
        }
        res.status(200).json(result[0]);
    });
});

// ✅ Save or Update Company Applicant Details
app.post("/saveCompanyDetails", verifyToken, (req, res) => {
    const {
      company_name,
      industry_type,
      company_description,
      company_phone,
      company_website,
      company_address,
      company_linkedin,
      company_social,
    } = req.body;
  
    // const userEmail = req.user.email;
    const email = req.user.email;
  if (!email) {
    return res.status(400).json({ error: "Email not found in token" });
  }
  
    const sql = `
  INSERT INTO company_info 
  (company_email, company_name, industry_type, company_description, company_phone, 
  company_website, company_address, company_linkedin, company_social)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE
  company_name = VALUES(company_name), industry_type = VALUES(industry_type), company_description = VALUES(company_description),
  company_phone = VALUES(company_phone), company_website = VALUES(company_website),
  company_address = VALUES(company_address), company_linkedin = VALUES(company_linkedin), company_social = VALUES(company_social)
`;
  
const values = [
    userEmail, company_name, industry_type, company_description, company_phone,
    company_website, company_address, company_linkedin, company_social
  ];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error saving profile:", err);
        return res.status(500).json({ message: "Database error" });
      }
      res.status(200).json({ message: "Profile saved successfully!" });
    });
  });

// ✅ Fetch Job Applicant Details (After Login)
app.get("/getCompanyDetails", verifyToken, (req, res) => {
    const email = req.user.email;
    const sql = "SELECT * FROM company_info WHERE company_email = ?";
  
    db.query(sql, [email], (err, result) => {
      if (err) {
        console.error("Error fetching data:", err);
        return res.status(500).json({ error: "Database query failed" });
      }
      if (result.length === 0) {
        return res.status(404).json({ error: "No company profile found" });
      }
      res.status(200).json(result[0]);
    });
  });

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
