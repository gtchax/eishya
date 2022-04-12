const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path"); // Accessing the path module
const connectToDatabase = require("./utils/db");
const errorHandler = require("./middleware/error.js");
const compression = require("compression");
require("dotenv").config();
let corsOptions = {
  origin: [process.env.SITE_URL, process.env.SITE_URL2],
  methods: ["GET", "PUT", "POST", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
connectToDatabase();
const app = express();

//---- Middleware
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(cors());
} else {
  app.use(morgan("dev"));
  app.use(cors(corsOptions));
}
app.use(compression());
app.use(helmet());
app.set("x-powered-by", false);

app.use(express.static(path.resolve(__dirname, "client", "build")));
// path.join(__dirname, "./client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  // res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// if (process.env.NODE_ENV === "production") {
//   // Step 1:
//   app.use(express.static(path.resolve(__dirname, "/client/build")));
//   // Step 2:
//   app.get("*", function (request, response) {
//     response.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

//--- Mounting routes
app.use("/api/v1", require("./routes/auth.routes"));
app.use("/api/v1", require("./routes/user.routes"));
app.use("/api/v1", require("./routes/admin.routes"));

//---- Error route
app.use(errorHandler);
// app.use((req, res, next, err) => {
//   err.statusCode = err.status || 500;
//   err.status = err.status || "error";
//   // console.log("inside error middleware", err);
//   // console.error(err.stack);
//   next(err);
//   res.status(500).send("Something broke!");

//   // return res.json({ success: false, error: err });
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
