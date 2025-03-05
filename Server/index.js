const express = require("express");
const crypto = require("crypto");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

let serverSeed = crypto.randomBytes(16).toString("hex"); // Generate secret seed

app.post("/roll-dice", (req, res) => {
  const clientSeed = req.body.clientSeed; //get seed from the client
  console.log("clientSeed:", clientSeed);
  // Create hash using SHA-256
  const hash = crypto
    .createHash("sha256")
    .update(serverSeed + clientSeed)
    .digest("hex");

  console.log("hash", hash);

  // Convert hash into a number between 1-6
  const diceRoll = (parseInt(hash.substring(0, 8), 16) % 6) + 1;

  return res.status(200).json({
    diceRoll,
    hash, // Send hash for verification
    serverSeed, // Reveal serverSeed after roll
  });
});

app.listen(PORT, () => console.log("Server running on port 3000"));
