const express = require("express");
const pool = require("../config/db");
const auth = require("../middleware/auth");

const router = express.Router();

router.use(auth);

router.get("/", async (req, res) => {
  const result = await pool.query("SELECT id,name,email FROM users");
  res.json(result.rows);
});

module.exports = router;