const mongoose = require("mongoose");

const mongoURL = process.env.MONGODB_URL;
const port = process.env.PORT;

exports.init = (app) => {
  try {
    mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "MongoDB connection error:"));

    db.once("open", function () {
      app.listen(port, function () {
        console.log(`App is listening on port ${port}!`);
      });
    });
  } catch (error) {
    console.log(error.message);
  }
};
