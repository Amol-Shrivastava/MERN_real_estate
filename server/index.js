import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app = express();

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
