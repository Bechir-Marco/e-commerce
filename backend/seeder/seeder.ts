
import connectDB from "../config/db";

import categoryData from "./categories";
import Category from "../models/CategoryModel";

const importData = async () => {
    try {
        await connectDB()
        await Category.collection.dropIndexes();
        await Category.collection.deleteMany({});
        await Category.insertMany(categoryData);
        console.log("Seeder data proceeded successfully");
        process.exit();
    } catch (error) {
        console.error("Error while proccessing seeder data", error);
        process.exit(1);
    }
};
importData()

