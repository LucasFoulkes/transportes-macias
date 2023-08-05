const express = require("express");
const path = require("path");
const https = require("https");
const http = require("http");
const fs = require("fs");
const cors = require("cors"); // Import cors module

const app = express();
const port = process.env.PORT || 3000;

// Use cors middleware
app.use(cors());

// Path to the React build folder
const distPath = path.join(__dirname, "../client/client-website/dist");

// Serve static files from the React build folder
app.use(express.static(distPath));

// Handle any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// SSL certificate options
let options = {};

try {
  options = {
    key: fs.readFileSync("/etc/letsencrypt/live/foulkes.studio/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/foulkes.studio/fullchain.pem"),
  };
} catch (err) {
  logger.error("Failed to load SSL certificates", err);
}

// Create an HTTPS service with the express app
if (options.key && options.cert) {
  const server = https.createServer(options, app);

// Start the server, listening on all network interfaces
server.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on https://0.0.0.0:${port}`);
});

