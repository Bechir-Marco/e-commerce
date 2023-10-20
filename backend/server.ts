import express from "express";
import connectDB from "./config/db";
import apiRoutes from "./routes/apiRoutes";
import fileUpload from "express-fileupload"
import cookieParser from "cookie-parser";
import cors from "cors";
connectDB();

const app = express();
const port = 5000;

app.use(express.json()); // Parse JSON request bodies
app.use(fileUpload())
app.use(cookieParser())
app.use(cors({
    origin: '*',
    methods: 'GET,POST,DELETE,PUT,PATCH,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
}));

app.get("/", async (req, res, next) => {
    res.json({ message: "API running..." });
});

app.use("/api", apiRoutes);

app.use((error, req, res, next) => {
    if (process.env.NODE_ENV === "development") {
        console.error(error);
    }
    next(error);
});

app.use((error, req, res, next) => {
    if (process.env.NODE_ENV === "development") {
        res.status(500).json({
            message: error.message,
            stack: error.stack,
        });
    } else {
        res.status(500).json({
            message: error.message,
        });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
