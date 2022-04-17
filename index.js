const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
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


if (process.env.NODE_ENV === "production") {
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
