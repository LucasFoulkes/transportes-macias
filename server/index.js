// Imports and Constants
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const winston = require("winston");
const cors = require("cors");
const compression = require("compression");
const express = require("express");
const https = require("https");
const { Sequelize } = require("sequelize");
const csvParser = require("csv-parser");
const httpsPort = process.env.HTTPS_PORT || 443;
const distPath = path.join(__dirname, "../dev/dist");
const imagesPath = path.join(__dirname, "./data/images");
const oneDay = 86400000;
const csvFilePath = path.join(__dirname, "./models/cars.csv");

// Logger Configuration
const logger = configureLogger();

// Sequelize Configuration
const sequelize = configureSequelize();
const Car = require(path.join(__dirname, "./models/car.js"))(sequelize);

// Express App Initialization
const app = configureExpressApp();

// Routes
configureRoutes(app);

// Server Initialization with HTTPS
initializeServer(app);

// Functions
function configureLogger() {
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
      new winston.transports.Console({ format: winston.format.simple() })
    );
  }
  return logger;
}

function configureSequelize() {
  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.db",
  });

  sequelize
    .sync()
    .then(() => logger.info("Database & tables created!"))
    .catch((err) => logger.error("Error creating tables:", err));

  return sequelize;
}

function configureExpressApp() {
  const app = express();
  app.use(compression());
  app.use(cors());
  app.use(morgan("combined"));
  app.use(
    express.static(distPath, { maxAge: oneDay, etag: true, lastModified: true })
  );
  app.use("/images", express.static(imagesPath));
  return app;
}

function configureRoutes(app) {
  app.get("/cars", async (req, res) => {
    try {
      const cars = await Car.findAll();
      res.json(cars);
    } catch (err) {
      logger.error(`Failed to retrieve cars: ${err}`);
      res.status(500).send(`Error: ${err}`);
    }
  });
  app.get("/process-csv", processCSVRoute); // New route for CSV processing
  app.use("/images", express.static(imagesPath)); // Serve images from relative folder

  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html")); // Serve index.html for all routes
  });
  app.use((req, res, next) => {
    /* 404 Handling */
  });
  app.use((err, req, res, next) => {
    /* Error Handling */
  });
}

function initializeServer(app) {
  let options = {};
  try {
    options = {
      key: fs.readFileSync(
        process.env.SSL_KEY_PATH ||
          "/etc/letsencrypt/live/translogisticamacias.ec-0001/privkey.pem"
      ),
      cert: fs.readFileSync(
        process.env.SSL_CERT_PATH ||
          "/etc/letsencrypt/live/translogisticamacias.ec-0001/fullchain.pem"
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
}

function processCSVRoute(req, res) {
  processCSVFile()
    .then(() => {
      res.status(200).send("CSV file successfully processed");
    })
    .catch((err) => {
      logger.error(`Failed to process CSV file: ${err}`);
      res.status(500).send(`Error: ${err}`);
    });
}

function processCSVFile() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on("data", async (row) => {
        try {
          await Car.create(row);
        } catch (err) {
          logger.error(
            `Failed to insert row: ${JSON.stringify(row)}, Error: ${err}`
          );
          reject(err);
        }
      })
      .on("end", () => {
        logger.info("CSV file successfully processed");
        resolve();
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}
