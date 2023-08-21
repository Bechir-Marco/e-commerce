import * as dotenv from "dotenv";
import mongoose from "mongoose";

const connectDB = async () => {
    await dotenv.config();

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connection SUCCESS");
    } catch (error) {
        console.error("MongoDB connection FAIL");
        process.exit(1);
    }
};

export default connectDB;
