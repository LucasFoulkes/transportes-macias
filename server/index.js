const express = require("express");
const path = require("path");
const https = require("https");
const fs = require("fs");
const morgan = require("morgan");
const winston = require("winston");
const cors = require("cors");

const app = express();
const httpsPort = process.env.HTTPS_PORT || 443;

app.use(cors());

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

app.use(morgan("combined"));

const distPath = path.join(__dirname, "../dev/dist");

// FOR DEVELOPMENT ONLY
// app.use(
//   express.static(distPath, {
//     setHeaders: (res) => {
//       res.set(
//         "Cache-Control",
//         "no-store, no-cache, must-revalidate, proxy-revalidate"
//       );
//       res.set("Pragma", "no-cache");
//       res.set("Expires", "0");
//     },
//   })
// );

app.use(
  express.static(distPath, {
    maxAge: "1d", // Cache for 1 day
    etag: true, // Enable ETag
    lastModified: true, // Enable Last-Modified
  })
);

app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

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

if (options.key && options.cert) {
  const server = https.createServer(options, app);

  server.listen(httpsPort, "0.0.0.0", () => {
    logger.info(`Server is running on https://localhost:${httpsPort}`);
  });
}

// Error handling
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send(`Error: ${err}`);
});

app.use((req, res, next) => {
  res.status(404).send("Sorry, we could not find that!");
});
