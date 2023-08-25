// Imports and Constants
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const compression = require("compression");
const express = require("express");
const http = require("http");
const https = require("https");
const { Sequelize } = require("sequelize");
const csvParser = require("csv-parser");

const httpsPort = process.env.HTTPS_PORT || 443;
const httpPort = process.env.HTTP_PORT || 80;
const distPath = path.join(__dirname, "../dev/dist");
const imagesPath = path.join(__dirname, "./data/images");
const oneDay = 86400000;
const csvFilePath = path.join(__dirname, "./models/cars.csv");

// Configure Sequelize (Database Connection)
const sequelize = configureSequelize();
const Car = require(path.join(__dirname, "./models/car.js"))(sequelize);

// Initialize Express App
const app = configureExpressApp();

// Configure Routes
configureRoutes(app);

// Initialize Servers (HTTP and HTTPS)
initializeServer(app);

// Function to configure Sequelize
function configureSequelize() {
  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.db",
  });
  sequelize.sync().catch((err) => console.error("Error creating tables:", err));
  return sequelize;
}

// Function to configure Express App
function configureExpressApp() {
  const app = express();
  app.use(compression());
  app.use(cors());
  app.use(express.static(distPath, { maxAge: oneDay }));
  return app;
}

// Function to configure routes
function configureRoutes(app) {
  app.use("/images", serveImages);
  app.get("/cars", getCars);
  app.get("/process-csv", processCSVRoute);
  app.get("*", (req, res) => res.sendFile(path.join(distPath, "index.html")));
  app.use((req, res) => res.status(404).send("Not Found")); // 404 Handling
  app.use((err, req, res) => res.status(500).send("Internal Server Error")); // General Error Handling
}

function serveImages(req, res, next) {
  const requestedPath = path.join(imagesPath, req.url);
  if (fs.existsSync(requestedPath)) {
    express.static(imagesPath)(req, res, next); // Serve the image using express.static
  } else {
    res.status(404).send("Image not found");
  }
}

// Function to get cars from the database
async function getCars(req, res) {
  try {
    const cars = await Car.findAll();
    res.json(cars);
  } catch (err) {
    res.status(500).send(`Error: ${err}`);
  }
}

// Function to initialize servers (HTTP and HTTPS)
function initializeServer(app) {
  try {
    const options = {
      key: fs.readFileSync(
        "/etc/letsencrypt/live/translogisticamacias.ec/privkey.pem"
      ),
      cert: fs.readFileSync(
        "/etc/letsencrypt/live/translogisticamacias.ec/fullchain.pem"
      ),
    };
    https
      .createServer(options, app)
      .listen(httpsPort, () => createHttpRedirectServer());
  } catch (err) {
    console.error("Failed to load SSL certificates", err);
  }
}

// Function to create HTTP server that redirects to HTTPS
function createHttpRedirectServer() {
  const httpApp = express();
  httpApp.get("*", (req, res) =>
    res.redirect(`https://${req.headers.host}${req.url}`)
  );
  http.createServer(httpApp).listen(httpPort);
}

// Function to process CSV file
function processCSVRoute(req, res) {
  processCSVFile()
    .then(() => res.status(200).send("CSV file successfully processed"))
    .catch((err) => res.status(500).send(`Error: ${err}`));
}

// Function to process CSV file and insert into the database
function processCSVFile() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on("data", async (row) => {
        try {
          await Car.create(row);
        } catch (err) {
          reject(err);
        }
      })
      .on("end", resolve)
      .on("error", reject);
  });
}
