const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const result = await pool.query(
    "INSERT INTO users (name, email, password_hash) VALUES ($1,$2,$3) RETURNING id,name,email",
    [name, email, hash]
  );

  res.json(result.rows[0]);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  const user = result.rows[0];

  if (!user) return res.status(401).json({ error: "Invalid" });

  const match = await bcrypt.compare(password, user.password_hash);

  if (!match) return res.status(401).json({ error: "Invalid" });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  res.json({ token });
});

module.exports = router;