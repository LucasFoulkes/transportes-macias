const express = require("express");
const path = require("path");
const https = require("https");
const http = require("http");
const fs = require("fs");
const morgan = require("morgan");
const winston = require("winston");

const app = express();
const httpsPort = 443; // Standard HTTPS port
const httpPort = 80; // Standard HTTP port

// Create a logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

// If we're not in production then log to the `console`
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

// Use morgan for HTTP request logging
app.use(morgan("combined"));

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

  // Start the HTTPS server
  server.listen(httpsPort, "0.0.0.0", () => {
    logger.info(`Server is running on https://localhost:${httpsPort}`);
  });

  // Create an HTTP server that redirects all traffic to HTTPS
  http
    .createServer((req, res) => {
      res.writeHead(301, {
        Location: "https://" + req.headers["host"] + req.url,
      });
      res.end();
    })
    .listen(httpPort, "0.0.0.0", () => {
      logger.info(
        `Redirecting all http traffic to https on https://localhost:${httpPort}`
      );
    });
}

// Middleware to handle errors
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send("Something broke!");
});

// Middleware to handle 404 errors
app.use((req, res, next) => {
  res.status(404).send("Sorry, we could not find that!");
});
