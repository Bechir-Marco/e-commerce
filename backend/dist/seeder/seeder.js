// import connectDB from "../config/db";
// import categoryData from "./categories";
// import Category from "../models/CategoryModel";
// import Product from "../models/ProductModel";
// import productData from "./products";
// import Review from "../models/ReviewModel";
// import reviewData from "./reviews";
// import User from "../models/UserModel";
// import usersData from "./users";
// import Order from '../models/OrderModel';
// import orderData from './orders'
// const importData = async () => {
//     try {
//         await connectDB()
//         await Category.collection.dropIndexes();
//         await Category.collection.deleteMany({});
//         await Category.insertMany(categoryData);
//         await Product.collection.dropIndexes()
//         await Product.collection.deleteMany()
//         await Review.collection.dropIndexes();
//         await Review.collection.deleteMany();
//         const reviews = await Review.insertMany(reviewData);
//         const productSample = productData.map((p) => {
//             reviews.map((r) => {
//                 p.reviews.push(r._id)
//             })
//             return {...p}
//         })
//         await Product.insertMany(productSample);
//         await User.collection.dropIndexes()
//         await User.collection.deleteMany()
//         await User.collection.insertMany(usersData)
//         await Order.collection.dropIndexes()
//         await Order.collection.deleteMany()
//         await Order.collection.insertMany(orderData)
//         console.log("Seeder data proceeded successfully");
//         process.exit();
//     } catch (error) {
//         console.error("Error while proccessing seeder data", error);
//         process.exit(1);
//     }
// };
// importData()
//# sourceMappingURL=seeder.js.map