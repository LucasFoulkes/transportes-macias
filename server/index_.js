const express = require("express");
const path = require("path");
const https = require("https");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

// Path to the React build folder
const distPath = path.join(__dirname, "../client/client-website/dist");

// Serve static files from the React build folder
app.use(express.static(distPath));

// Handle any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// SSL certificate options
const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
  passphrase: "771421",
};

// Create an HTTPS service with the express app
const server = https.createServer(options, app);

// Start the server
server.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});

