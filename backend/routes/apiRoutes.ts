import express from "express";
const app = express();
import productRoutes from "./productRoutes";

app.use("/products", productRoutes);

export default app;
