import chalk from "chalk";
import { NODE_ENV } from "../config/config.js";

const errorHandler = (err, req, res, next) => {
  console.error(
    chalk.red("Caught by error middleware:"),
    chalk.magenta(`${req.method} ${req.originalUrl}`),
    chalk.yellow(err.message)
  );
  if (NODE_ENV === "development" && err.stack) {
    console.error(chalk.yellow(err.stack));
  }

  // Use a generic message in production to avoid leaking sensitive info
  const statusCode = err.statusCode || 500;
  const message = err.statusCode ? err.message : "Internal Server Error";

  res.status(statusCode).json({
    msg: message,
    // In development, you might include err.stack for debugging
    // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

export default errorHandler;
