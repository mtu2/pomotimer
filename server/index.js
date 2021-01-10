const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Require MongoDB connection
require("./models");

// Configure body parser for AJAX requests
app.use(cors());
app.use(express.json());

// Import routes
const routes = require("./routes");
app.use(routes);

// Routing in production
if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  const path = require("path");
  app.use(express.static(path.resolve(__dirname, "../client/build")));

  // Express will send React app if it doesn't recognise the route from API routes or from "client/build" directory
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

// Bootstrap server
app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
