import express from "express"
import activityRoutes from "./routes/activityRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorHandler.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; 

dotenv.config();

const app=express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/activities", activityRoutes);
app.use("/groups", groupRoutes);

app.get('/health',(req,res)=>{
    res.json({status:"Success"});
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });

  } catch (error) {
    console.log("Database connection failed:", error);
  }
};

startServer();