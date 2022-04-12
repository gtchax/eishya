const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const connectToDatabase = require("./utils/db");
const errorHandler = require("./middleware/error.js");

require("dotenv").config();
let corsOptions = {
  origin: ["http://localhost:3000", "https://localhost:3000"],
  methods: ["GET", "PUT", "POST", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
connectToDatabase();
const app = express();

//---- Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(helmet());
app.set("x-powered-by", false);
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
