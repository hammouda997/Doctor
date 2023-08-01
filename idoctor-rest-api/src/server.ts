import express from "express";
import path from "path";
import mongoose from "mongoose";

import authRoutes from "./routes/auth-routes";
import userRoutes from "./routes/user-routes";
import patientRoutes from "./routes/patient-routes";
import visitsRoutes from "./routes/visits-routes";
import reportsRoutes from "./routes/reports-routes";
import productRoutes from "./routes/product-routes";
import chargesRoutes from "./routes/charges-routes";

import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
// @ts-ignore
import xss from "xss-clean";
import bodyParser from "body-parser";
import cors from "cors";
import currentUser from "middleware/currentUser";
import {seedUsers} from "seeders/userSeed";

require("dotenv").config();

const app = express();
// @ts-ignore

app.disable("x-powered-by");
// set security HTTP headers
app.use(helmet());

// parse urlencoded request body
app.use(bodyParser.json({limit: "20mb"})); // We upped the limit because an Apple receipt string is a bit large
app.use(
  bodyParser.urlencoded({
    limit: "20mb",
    extended: true,
    parameterLimit: 5000,
  })
);
app.use("*", cors());
// enable cors
app.use(
  cors({
    origin: ["http://localhost:3000", "https://example.com"],
  })
);
// Set trust proxy for CloudFlare and nginx on production
// app.set('trust proxy', ['loopback']);
// sanitize request data
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());

app.use("/api/user", authRoutes);
app.use("/health", (req, res) => {
  res.status(200).json({message: "Server is healthy"});
});
app.use("/api/user", currentUser, userRoutes);
app.use("/api/patient", currentUser, patientRoutes);
app.use("/api/visits", currentUser, visitsRoutes);
app.use("/api/stats", currentUser, reportsRoutes);
app.use("/api/product", currentUser, productRoutes);
app.use("/api/charges", currentUser, chargesRoutes);

app.use(
  "/uploads/images",
  express.static(path.join(__dirname, "/uploads/images"))
);

app.get("/*", (req, res) => {
  res.status(404).json({message: "Welcome to the server"});
});

const port = process.env.PORT || 5000;
const DB_LINK = process.env.DB_LINK || "mongodb://localhost/user";
mongoose
  .connect(DB_LINK, {
    autoCreate: true,
    autoIndex: true,
  })
  .then(() => {
    console.log("Connected to database");
    // remove this line in production to prevent seeding
    seedUsers().then(() => {
      console.log("Seeded users");
    });

    app.listen(port, () => {
      console.log("Server listening on port", port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
