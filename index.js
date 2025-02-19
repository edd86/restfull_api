const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const clientRouter = require("./routes/clients");
const cors = require("cors");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 3000;

//Middleware
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err.message));

app.use("/clients", clientRouter);

//Route Base
/**
 * Route handler for the root endpoint
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.get("/", (req, res) => {
  res.send("Hello from a simple server!");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
app.use(cors());
