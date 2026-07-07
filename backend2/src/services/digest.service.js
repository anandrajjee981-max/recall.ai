const User = require("../models/User.model");
const SavedItem = require("../models/SavedItem.model");
const { sendEmail } = require("./email.service");
const logger = require("../config/logger");

const sendWeeklyDigestForUser = async (user) => {
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const itemsThisWeek = await SavedItem.find({
    user: user._id,
    createdAt: { $gte: oneWeekAgo },
  })
    .populate("library", "name")
    .sort({ createdAt: -1 });

  if (itemsThisWeek.length === 0) {
    return;
  }

  const itemListHtml = itemsThisWeek
    .map(
      (item) => `
      <li>
        <strong>${item.title || "Untitled"}</strong> 
        (${item.library?.name || "Uncategorized"})<br/>
        <a href="${item.url}">${item.url}</a>
        ${item.summary ? `<p style="color:#555;">${item.summary}</p>` : ""}
      </li>`
    )
    .join("");

  const html = `
    <h2>Your Second Brain — Weekly Digest 🧠</h2>
    <p>You saved ${itemsThisWeek.length} item(s) this week:</p>
    <ul>${itemListHtml}</ul>
    <p>Keep building your knowledge base!</p>
  `;

  await sendEmail({
    to: user.email,
    subject: `Your Weekly Digest — ${itemsThisWeek.length} new saves`,
    html,
  });
};

const sendWeeklyDigestForAllUsers = async () => {
  const users = await User.find({});

  for (const user of users) {
    try {
      await sendWeeklyDigestForUser(user);
    } catch (err) {
      logger.error(`Failed to send digest to ${user.email}: ${err.message}`);
    }
  }
};

module.exports = { sendWeeklyDigestForAllUsers };