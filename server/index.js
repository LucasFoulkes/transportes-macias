const express = require("express");
const path = require("path");
const https = require("https");
const fs = require("fs");
const morgan = require("morgan");
const winston = require("winston");
const cors = require("cors");

const app = express();
const httpsPort = process.env.HTTPS_PORT || 443;
const distPath = path.join(__dirname, "../dev/dist");

// Logger Configuration
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

// Middleware Configuration
app.use(cors());
app.use(morgan("combined"));
app.use(
  express.static(distPath, {
    maxAge: "1d", // Cache for 1 day
    etag: true, // Enable ETag
    lastModified: true, // Enable Last-Modified
  })
);

// Routes
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// SSL Configuration
let options = {};

try {
  options = {
    key: fs.readFileSync(
      process.env.SSL_KEY_PATH ||
        "/etc/letsencrypt/live/foulkes.studio/privkey.pem"
    ),
    cert: fs.readFileSync(
      process.env.SSL_CERT_PATH ||
        "/etc/letsencrypt/live/foulkes.studio/fullchain.pem"
    ),
  };
} catch (err) {
  logger.error("Failed to load SSL certificates", err);
}

// Server Initialization
if (options.key && options.cert) {
  const server = https.createServer(options, app);

  server.listen(httpsPort, "0.0.0.0", () => {
    logger.info(`Server is running on https://localhost:${httpsPort}`);
  });
}

// Error Handling
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send(`Error: ${err}`);
});

app.use((req, res, next) => {
  res.status(404).send("Sorry, we could not find that!");
});
