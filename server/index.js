import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//import Routes
import UserRouter from "./routes/user.route.js";
import AuthRouter from "./routes/auth.route.js";

//import Middleware
import { errorHandler } from "./middleware/errorHandler.middleware.js";

const app = express();
dotenv.config();

//allow json
app.use(express.json());
app.use(cookieParser());

//calling routes
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/auth", AuthRouter);

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
