const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const { errorHandler } = require("./middlewares/errorMiddleware");

// Database Connection
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(errorHandler);

// Routes
app.use("/api", require("./routes"));

const port = process.env.PORT || 8080;
app.listen(port, () =>
  console.log(`Server : http://localhost:${port}`.cyan.underline)
);
