import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import chalk from "chalk";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { v4 } from "uuid";

import indexRoute from "../src/routes/index.js";
import errorHandler from "../src/middlewares/errorHandlers.js";
import logger from "../src/utils/logger/index.js";
import { PORT } from "../src/config/app.js";
import { getFilesContent } from "../src/services/files/index.js";
import { swaggerOptions } from "../src/config/swagger.js";

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan(":method :url :status :response-time ms"));

app.use("/", indexRoute);

// Custom error handler middleware
app.use(errorHandler);

app.get("/api", (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get("/api/item/:slug", (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

// Start the Express.js server
const port = PORT || 3000;

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
  console.log(
    chalk.bgBlue.bold.white("╔════════════════════════════════════════════╗")
  );
  console.log(
    chalk.bgBlue.bold.white("║               Toolbox Test Server          ║")
  );
  console.log(
    chalk.bgBlue.bold.white("╚════════════════════════════════════════════╝")
  );
});

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

//  Start the files service
getFilesContent();

export default app;
