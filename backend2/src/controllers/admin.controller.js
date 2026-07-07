const { sendWeeklyDigestForAllUsers } = require("../services/digest.service");
const { sendForgottenSavesReminderForAllUsers } = require("../services/reminder.service");

// @route  POST /api/admin/trigger-digest
const triggerDigest = async (req, res) => {
  try {
    await sendWeeklyDigestForAllUsers();
    res.status(200).json({ message: "Weekly digest sent" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send digest", error: error.message });
  }
};

// @route  POST /api/admin/trigger-reminder
const triggerReminder = async (req, res) => {
  try {
    await sendForgottenSavesReminderForAllUsers();
    res.status(200).json({ message: "Reminder emails sent" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send reminders", error: error.message });
  }
};

module.exports = { triggerDigest, triggerReminder };