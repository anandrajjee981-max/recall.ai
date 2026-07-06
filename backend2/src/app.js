const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const libraryRoutes = require("./routes/library.routes");
const itemRoutes = require("./routes/item.routes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Second Brain AI backend is running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/libraries", libraryRoutes);
app.use("/api/items", itemRoutes);

module.exports = app;