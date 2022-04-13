const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const fs = require("fs");
const morgan = require("morgan");
const path = require("path"); // Accessing the path module
const connectToDatabase = require("./server/utils/db");
const errorHandler = require("./server/middleware/error.js");
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

// deployment
// const _dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  // Step 1:
  // app.use(express.static(path.join(_dirname, "client/build")));
  // // Step 2:
  // app.get("*", function (req, res) {
  //   res.sendFile(path.resolve(_dirname, "client", "build", "index.html"));
  // });
  app.get("/", (req, res) => {
    res.send({ success: true, data: "Working" });
  });
}

//--- Mounting routes
app.use("/api/v1", require("./server/routes/auth.routes"));
app.use("/api/v1", require("./server/routes/user.routes"));
app.use("/api/v1", require("./server/routes/admin.routes"));

//--- Error route
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
