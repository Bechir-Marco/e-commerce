import express from "express";
const app = express();
import productRoutes from "./productRoutes";
// import orderRoutes from "./orderRoutes";
import userRoutes from "./userRoutes";
import categoryRoutes from './categoryRoutes'

app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/users", userRoutes);
// app.use("/orders", orderRoutes);
export default app;

