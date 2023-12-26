const express = require("express");
require("dotenv").config();
require("express-async-handler");
const router = require("./routes/userRoute");
const { notFound, errorHandler } = require("./middleware/errrorMiddleware");
const cookieParser = require("cookie-parser");

const Port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", router);
app.use(notFound);
app.use(errorHandler);

const start = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("connected");
      app.listen(Port, () => {
        console.log(`server is listening to port ${Port}`);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
start();
