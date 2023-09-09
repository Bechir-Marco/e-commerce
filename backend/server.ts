import express from "express";
import connectDB from "./config/db";
import apiRoutes from "./routes/apiRoutes";

connectDB();

const app = express();
const port = 3000;
app.use(express.json()); // Parse JSON request bodies


app.get("/", async (req, res, next) => {
    res.json({ message: "API running..." });
});

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
