const express = require("express");
const cors = require("cors");
const morgan = require("morgan"); //HTTP request logger middleware
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "development") {
  // Requests will be shown in console in development
  app.use(morgan("dev"));
}

// Require MongoDB connection
require("./models");

// Passport config
require("./config/passport")(passport);

// Configure body parser for AJAX requests
app.use(cors());
app.use(express.json());

// Session middleware (store session in MongoDB)
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

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
