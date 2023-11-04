import express from "express";
import connectDB from "./config/db";
import apiRoutes from "./routes/apiRoutes";
import fileUpload from "express-fileupload"
import cookieParser from "cookie-parser";
import cors from "cors";
import { Server } from "socket.io";
import  { createServer } from "http";
connectDB();
const app = express();

const httpServer = createServer(app);
global.in = new Server(httpServer);

global.io.on("connection", (socket) => {
    socket.on("client sends message", (msg) => {
        console.log(msg);
    });
})

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

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
