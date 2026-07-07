const User = require("../models/User.model");
const SavedItem = require("../models/SavedItem.model");
const { sendEmail } = require("./email.service");
const logger = require("../config/logger");

const sendForgottenSavesReminderForUser = async (user) => {
  const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

  const forgottenItems = await SavedItem.find({
    user: user._id,
    createdAt: { $lte: twoWeeksAgo },
    lastViewedAt: null,
  })
    .populate("library", "name")
    .limit(10);

  if (forgottenItems.length === 0) {
    return;
  }

  const itemListHtml = forgottenItems
    .map(
      (item) => `
      <li>
        <strong>${item.title || "Untitled"}</strong> 
        (${item.library?.name || "Uncategorized"})<br/>
        <a href="${item.url}">${item.url}</a>
      </li>`
    )
    .join("");

  const html = `
    <h2>Don't forget these saves 👀</h2>
    <p>You saved these a while ago but haven't opened them yet:</p>
    <ul>${itemListHtml}</ul>
  `;

  await sendEmail({
    to: user.email,
    subject: `You have ${forgottenItems.length} forgotten saves`,
    html,
  });
};

const sendForgottenSavesReminderForAllUsers = async () => {
  const users = await User.find({});

  for (const user of users) {
    try {
      await sendForgottenSavesReminderForUser(user);
    } catch (err) {
      logger.error(`Failed to send reminder to ${user.email}: ${err.message}`);
    }
  }
};

module.exports = { sendForgottenSavesReminderForAllUsers };