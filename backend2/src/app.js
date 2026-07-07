const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const rateLimit = require("express-rate-limit");
const passport = require("./config/passport");
const authRoutes = require("./routes/auth.routes");
const oauthRoutes = require("./routes/oauth.routes");
const libraryRoutes = require("./routes/library.routes");
const itemRoutes = require("./routes/item.routes");
const chatRoutes = require("./routes/chat.routes");
const searchRoutes = require("./routes/search.routes");
const adminRoutes = require("./routes/admin.routes");
const { notFound, errorHandler } = require("./middlewares/error.middleware");

const app = express();

app.use(cors({
  origin: true, // or your specific frontend/extension origin
  credentials: true,
}));
app.use(helmet());
app.use(express.json());
app.use("/api/chat", chatRoutes);
app.use("/api/admin", adminRoutes);
app.use(cookieParser());

// Required by Passport internally, even with session:false on routes
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: "Too many requests, please try again later" },
});
app.use(limiter);

app.get("/", (req, res) => {
  res.send("Second Brain AI backend is running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/auth", oauthRoutes); // /api/auth/google, /api/auth/github
app.use("/api/libraries", libraryRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/search", searchRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;