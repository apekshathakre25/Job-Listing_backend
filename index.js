const express = require("express");
const cors = require("cors");
const { connecToDb } = require("./connection");
const authRouter = require("./routes/auth");
const jobRouter = require("./routes/job");
const errorHandler = require("./middleWare/errorHandler");
const cookieParser = require("cookie-parser");
const port = 6002;

const app = express();
app.use(cors({ methods: ["GET", "POST", "DELETE", "PUT"], credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connecToDb("mongodb://127.0.0.1:27017/job-listing")
  .then(() => {
    console.log("MongoDb Connected");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/job", jobRouter);

app.get("/api/health", (req, res) => {
  res.json({
    service: "Job Listing Backend API Server",
    status: "true",
    time: new Date(),
  });
});

app.use(errorHandler);
app.listen(port, () => console.log(`Server started at port ${port}`));
