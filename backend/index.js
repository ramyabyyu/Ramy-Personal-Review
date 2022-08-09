const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const { errorHandler } = require("./middlewares/errorMiddleware");
const path = require("path");

// Database Connection
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(errorHandler);

// Routes
app.use("/api", require("./routes"));

// Serve Frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("You're not in production"));
}

const port = process.env.PORT || 8080;
app.listen(port, () =>
  console.log(`Server : http://localhost:${port}`.cyan.underline)
);
