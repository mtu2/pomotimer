const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// When successfully connected
mongoose.connection.on("connected", () => {
  console.log("Established Mongoose Default Connection");
});
// When connection throws an error
mongoose.connection.on("error", (err) => {
  console.log("Mongoose Default Connection Error : " + err);
});
