const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectToDatabase = require("./server/utils/db");
const errorHandler = require("./server/middleware/error.js");
const compression = require("compression");

require("dotenv").config();

// Configuring cors to receive requests from a particular host and to accept http methods listed in the methods array
let corsOptions = {
  origin: [process.env.SITE_URL, process.env.SITE_URL2],
  methods: ["GET", "PUT", "POST", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

connectToDatabase(); //Connecting to MongoDB

const app = express();

//---- Middleware
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(cors()); // Sets the appropriate headers to the response object to prevent cross-origin request error on the frontend
} else {
  app.use(morgan("dev")); //prints to the console every request received by the server. Extremely helpful during development
  app.use(cors(corsOptions));
}
app.use(compression()); // Compresses the response so that less bandwidth is required
app.use(helmet()); // Middleware that certain headers to every response for extra security
app.set("x-powered-by", false);



//--- Mounting routes
app.get("/", (req, res) => {
  res.send({ success: true, data: "Working" });
});
app.use("/api/v1", require("./server/routes/auth.routes"));
app.use("/api/v1", require("./server/routes/user.routes"));
app.use("/api/v1", require("./server/routes/admin.routes"));

//--- Error route
app.use(errorHandler); // The error middleware to catch all the errors thrown by any of the routes above.

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
