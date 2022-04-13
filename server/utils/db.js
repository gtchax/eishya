const mongoose = require("mongoose");
// Database URL
require("dotenv").config();
const uri = process.env.DB_URL;
// "mongodb://localhost:27017/ice";
// "mongodb+srv://gwinyai:20Hyperiondev22@hyperion-dev.ykgcd.mongodb.net/store?retryWrites=true&w=majority";

// Connects to the database. Code copied from lecture notes
function connectToDatabase() {
  mongoose.Promise = global.Promise;
  mongoose.connect(uri);
  mongoose.connection.on("error", function (err) {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });
  mongoose.connection.once("open", function () {
    console.log("Successfully connected to the database");
  });
}

module.exports = connectToDatabase;
