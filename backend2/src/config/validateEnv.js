const logger = require("./logger");

const requiredEnvVars = [
  "PORT",
  "MONGO_URI",
  "JWT_SECRET",
  "JWT_REFRESH_SECRET",
  "ANTHROPIC_API_KEY",
  "OPENAI_API_KEY",
];

const validateEnv = () => {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    logger.error("❌ Missing required environment variables:");
    missing.forEach((key) => logger.error(`   - ${key}`));
    logger.error("Check your .env file and add the missing values before starting the server.");
    process.exit(1);
  }

  logger.info("✅ Environment variables validated");
};

module.exports = validateEnv;