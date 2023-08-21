"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const getProducts = (req, res) => {
    ProductModel_1.default.create({ name: "Panasonic" });
    res.send("Handling product routes, e.g. search for products");
};
module.exports = getProducts;
//# sourceMappingURL=productController.js.map