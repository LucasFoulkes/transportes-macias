const express = require("express");
const path = require("path");
const https = require("https");
const http = require("http");
const fs = require("fs");
const morgan = require("morgan");
const winston = require("winston");
const cors = require("cors");
const { restart } = require("nodemon");

const app = express();
const httpsPort = 443;
const httpPort = 80;

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



const distPath = path.join(__dirname, "../tests/map/dist");

app.use(express.static(distPath, {
  setHeaders: (res) => {
    res.set('Cache-Control', 'no-store');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
  }
}));

app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

let options = {};

try {
  options = {
    key: fs.readFileSync("/etc/letsencrypt/live/foulkes.studio/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/foulkes.studio/fullchain.pem"),
  };
} catch (err) {
  logger.error("Failed to load SSL certificates", err);
}

if (options.key && options.cert) {
  const server = https.createServer(options, app);

  server.listen(httpsPort, "0.0.0.0", () => {
    logger.info(`Server is running on https://localhost:${httpsPort}`);
  });

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

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send(`Error: ${err}`)
});

app.use((req, res, next) => {
  res.status(404).send("Sorry, we could not find that!");
});
