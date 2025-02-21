const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Enable CORS to allow cross-origin requests
app.use(cors());

// Use JSON parsing middleware
app.use(bodyParser.json());

// GET endpoint to return a simple operation code
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// POST endpoint to process incoming data
app.post("/bfhl", (req, res) => {
  const { data } = req.body;

  // Validate input - ensure "data" is provided and is an array
  if (!data || !Array.isArray(data)) {
    return res
      .status(400)
      .json({ error: "Invalid input format. Expecting an array." });
  }

  // User details (hardcoded)
  const userDetails = {
    user_id: "shudhanshu_Kumar_Tiwari_22BCS10311",
    email: "sktiwary9122@gmail.com",
    roll_number: "22BCS10311",
  };

  // Separate numbers and alphabets
  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => /^[A-Za-z]$/.test(item));

  // Determine the highest-ranking alphabet (case-insensitive)
  const highest_alphabet = alphabets.length
    ? [alphabets.reduce((a, b) => (a.toLowerCase() > b.toLowerCase() ? a : b))]
    : [];

  // Send the response
  res.status(200).json({
    is_success: true,
    ...userDetails,
    numbers,
    alphabets,
    highest_alphabet,
  });
});

// Start the server
app.listen(3000, () => {
  console.log(`Server running on http://localhost:${3000}`);
});
