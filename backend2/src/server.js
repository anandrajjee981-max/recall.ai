const dotenv = require("dotenv");
dotenv.config();

const validateEnv = require("./config/validateEnv");
validateEnv();

const app = require("./app");
const connectDB = require("./config/db");
const startScheduledJobs = require("./jobs/scheduledJobs");
const logger = require("./config/logger");

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    logger.info(`🚀 Server running on http://localhost:${PORT}`);
    startScheduledJobs();
  });
});