import Product from "../models/ProductModel";

const getProducts = (req, res) => {
    Product.create({ name: "Panasonic" });
    res.send("Handling product routes, e.g. search for products");
};
module.exports = getProducts;
