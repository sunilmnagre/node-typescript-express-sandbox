"use strict";

import express, { Express, Request, Response } from 'express';
import cors from "cors";
import jsend from "jsend";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./api-docs/swagger.js";
import routes from "./app/routes/index";

const app: Express = express();

// Setup express server port from ENV, default: 8001
const port = process.env.PORT || 8001;

// For parsing json
app.use(express.json({ limit: "5mb" }));

// For parsing application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
    limit: "5mb",
  })
);

// Init all other stuff
app.use(cors());
app.use(jsend.middleware);

// API documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { explorer: true })
);

// Send welcome message on landing API call
app.get("/", (req, res) => { res.send("<br><br>Welcome to <project> API")});

// Expose all the routes
app.use("/api", routes);

// Start the application
app.listen(port, () => { console.info("\nApp has been started on port: " + port)});

module.exports = app;