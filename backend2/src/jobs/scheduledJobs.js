const cron = require("node-cron");
const { sendWeeklyDigestForAllUsers } = require("../services/digest.service");
const { sendForgottenSavesReminderForAllUsers } = require("../services/reminder.service");
const logger = require("../config/logger");

const startScheduledJobs = () => {
  // Every Monday at 9:00 AM server time
  cron.schedule("0 9 * * 1", async () => {
    logger.info("Running weekly digest job...");
    await sendWeeklyDigestForAllUsers();
    logger.info("Weekly digest job complete.");
  });

  // Every day at 10:00 AM server time
  cron.schedule("0 10 * * *", async () => {
    logger.info("Running forgotten saves reminder job...");
    await sendForgottenSavesReminderForAllUsers();
    logger.info("Forgotten saves reminder job complete.");
  });

  logger.info("✅ Scheduled jobs registered");
};

module.exports = startScheduledJobs;