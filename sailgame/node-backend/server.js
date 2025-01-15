require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const app = express();
app.use(cors());
app.use(express.json());

// Middleware to verify Supabase token
const authenticateUser = async (req, res, next) => {
  console.log("Backend: Verifying token...");
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    console.log("Backend: No token provided");
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);
    if (error) throw error;
    console.log("Backend: Token valid for user:", user.email);
    req.user = user;
    next();
  } catch (error) {
    console.error("Backend: Invalid token:", error.message);
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Protected route example
app.get("/api/protected", authenticateUser, (req, res) => {
  res.json({ message: "This is protected data!", user: req.user });
});

app.get("/api/races", authenticateUser, (req, res) => {
  // Placeholder sailing races
  const races = [
    { id: 1, name: "Harbor Sprint" },
    { id: 2, name: "Bay Challenge" },
    { id: 3, name: "Coastal Circuit" },
  ];
  res.json(races);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
