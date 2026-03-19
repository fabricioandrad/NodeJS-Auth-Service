const express = require("express");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Auth API is running"
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok"
  });
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

module.exports = app;