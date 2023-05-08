const mongoose = require("mongoose");

const mongoURL = process.env.MONGODB_URL;

exports.init = () => {
  try {
    mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "MongoDB connection error:"));

    db.once("open", function () {
      console.log("database is connected")
    });
  } catch (error) {
    console.log(error.message);
  }
};
