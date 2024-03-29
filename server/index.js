import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//import Routes
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";

//import Middleware
import { errorHandler } from "./middleware/errorHandler.middleware.js";

const app = express();
dotenv.config();

//allow json
app.use(express.json());
app.use(cookieParser());

//calling routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/listing", listingRouter);

//error Handler
app.use(errorHandler);

const startDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected To DB");
  } catch (error) {
    throw error;
  }
};

const startServer = async () => {
  try {
    await startDB();
    app.listen(3000, () => {
      console.log("server is running 3000 port");
    });
  } catch (error) {
    throw error;
  }
};

startServer();
