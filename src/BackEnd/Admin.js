const express = require("express");
const router = express.Router();
const db = require("./db");
const jwt = require("jsonwebtoken");

router.post("/AdminLogin", (req, res) => {  // Keeping "/AdminLogin"
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

module.exports = router;
