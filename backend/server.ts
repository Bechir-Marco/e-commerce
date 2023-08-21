import express from "express";
const app = express();
const port = 3000;

import apiRoutes from "./routes/apiRoutes";

app.get("/", async (req, res, next) => {
    res.json({ message: "API running..." });
});

// import the connectDB function
import connectDB from "./config/db";

connectDB();

app.use("/api", apiRoutes);

app.use((error, req, res, next) => {
    console.error(error);
    next(error);
});

app.use((error, req, res, next) => {
    res.status(500).json({
        message: error.message,
        stack: error.stack,
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
