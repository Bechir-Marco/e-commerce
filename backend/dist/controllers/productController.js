"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminDeleteProductImage = exports.adminUpload = exports.adminUpdateProduct = exports.adminCreateProduct = exports.adminDeleteProduct = exports.adminGetProducts = exports.getBestsellers = exports.getProductById = exports.getProducts = void 0;
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const pagination_1 = __importDefault(require("../config/pagination"));
const imageValidation_1 = __importDefault(require("../utils/imageValidation"));
const path = __importStar(require("path"));
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
const getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = {};
        let queryCondition = false;
        let priceQueryCondition = {};
        if (req.query.price) {
            queryCondition = true;
            priceQueryCondition = { price: { $lte: Number(req.query.price) } };
        }
        let ratingQueryCondition = {};
        if (req.query.rating) {
            queryCondition = true;
            ratingQueryCondition = { rating: { $in: req.query.rating.split(",") } };
        }
        let categoryQueryCondition = {};
        const categoryName = req.params.categoryName || "";
        if (categoryName) {
            queryCondition = true;
            const a = categoryName.replaceAll(",", "/");
            const regEx = new RegExp("^" + a);
            categoryQueryCondition = { category: regEx };
        }
        if (req.query.category) {
            queryCondition = true;
            const a = req.query.category.split(",").map((item) => {
                if (item)
                    return new RegExp("^" + item);
            });
            categoryQueryCondition = {
                category: { $in: a },
            };
        }
        let attrsQueryCondition = [];
        if (req.query.attrs) {
            // attrs=RAM-1TB-2TB-4TB,color-blue-red
            // [ 'RAM-1TB-4TB', 'color-blue', '' ]
            attrsQueryCondition = req.query.attrs.split(",").reduce((acc, item) => {
                if (item) {
                    const a = item.split("-");
                    const values = [...a];
                    values.shift(); // removes first item
                    const a1 = {
                        attrs: { $elemMatch: { key: a[0], value: { $in: values } } },
                    };
                    acc.push(a1);
                    // console.dir(acc, { depth: null })
                    return acc;
                }
                else
                    return acc;
            }, []);
            //   console.dir(attrsQueryCondition, { depth: null });
            queryCondition = true;
        }
        //pagination
        const pageNum = Number(req.query.pageNum) || 1;
        // sort by name, price etc.
        let sort = {};
        const sortOption = req.query.sort || "";
        if (sortOption) {
            const sortOpt = sortOption.split("_");
            sort = { [sortOpt[0]]: Number(sortOpt[1]) };
        }
        const searchQuery = req.params.searchQuery || "";
        let searchQueryCondition = {};
        let select = {};
        if (searchQuery) {
            queryCondition = true;
            searchQueryCondition = { $text: { $search: searchQuery } };
            select = {
                score: { $meta: "textScore" },
            };
            sort = { score: { $meta: "textScore" } };
        }
        if (queryCondition) {
            query = {
                $and: [
                    priceQueryCondition,
                    ratingQueryCondition,
                    categoryQueryCondition,
                    searchQueryCondition,
                    ...attrsQueryCondition,
                ],
            };
        }
        const totalProducts = yield ProductModel_1.default.countDocuments(query);
        const products = yield ProductModel_1.default.find(query)
            .select(select)
            .skip(pagination_1.default * (pageNum - 1))
            .sort(sort)
            .limit(pagination_1.default);
        res.json({
            products,
            pageNum,
            paginationLinksNumber: Math.ceil(totalProducts / pagination_1.default),
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield ProductModel_1.default.findById(req.params.id)
            .populate("reviews")
            .orFail();
        res.json(product);
    }
    catch (err) {
        next(err);
    }
});
exports.getProductById = getProductById;
const getBestsellers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield ProductModel_1.default.aggregate([
            { $sort: { category: 1, sales: -1 } },
            {
                $group: { _id: "$category", doc_with_max_sales: { $first: "$$ROOT" } },
            },
            { $replaceWith: "$doc_with_max_sales" },
            { $match: { sales: { $gt: 0 } } },
            { $project: { _id: 1, name: 1, images: 1, category: 1, description: 1 } },
            { $limit: 3 },
        ]);
        res.json(products);
    }
    catch (err) {
        next(err);
    }
});
exports.getBestsellers = getBestsellers;
const adminGetProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield ProductModel_1.default.find({})
            .sort({ category: 1 })
            .select("name price category");
        return res.json(products);
    }
    catch (err) {
        next(err);
    }
});
exports.adminGetProducts = adminGetProducts;
const adminDeleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield ProductModel_1.default.findById(req.params.id).orFail();
        yield product.deleteOne();
        res.json({ message: "product removed" });
    }
    catch (err) {
        next(err);
    }
});
exports.adminDeleteProduct = adminDeleteProduct;
const adminCreateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = new ProductModel_1.default();
        const { name, description, count, price, category, attributesTable } = req.body;
        product.name = name;
        product.description = description;
        product.count = count;
        product.price = price;
        product.category = category;
        if (attributesTable.length > 0) {
            attributesTable.map((item) => {
                product.attrs.push(item);
            });
        }
        yield product.save();
        res.json({
            message: "product created",
            productId: product._id,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.adminCreateProduct = adminCreateProduct;
const adminUpdateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield ProductModel_1.default.findByIdAndUpdate(req.params.id).orFail();
        const { name, description, count, price, category, attributesTable } = req.body;
        product.name = name;
        product.description = description;
        product.count = count;
        product.price = price;
        product.category = category;
        if (attributesTable && attributesTable.length > 0) {
            product.attrs = [];
            attributesTable.map((item) => {
                product.attrs.push(item);
            });
        }
        else {
            product.attrs = [];
        }
        yield product.save();
        res.json({
            message: "product updated",
        });
    }
    catch (err) {
        next(err);
    }
});
exports.adminUpdateProduct = adminUpdateProduct;
const adminUpload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.query.cloudinary === "true") {
        try {
            const product = yield ProductModel_1.default.findById(req.query.productId).orFail();
            product.images.push({ path: req.body.url });
            yield product.save();
        }
        catch (err) {
            next(err);
        }
        return;
    }
    try {
        if (!req.files || !!req.files.images === false) {
            return res.status(400).send("No files were uploaded.");
        }
        const validateResult = (0, imageValidation_1.default)(req.files.images);
        if (validateResult.error) {
            return res.status(400).send(validateResult.error);
        }
        const uploadDirectory = path.resolve(__dirname, "../../frontend", "public", "images", "products");
        const product = yield ProductModel_1.default.findById(req.query.productId).orFail();
        let imagesTable = [];
        if (Array.isArray(req.files.images)) {
            imagesTable = req.files.images;
        }
        else {
            imagesTable.push(req.files.images);
        }
        for (const image of imagesTable) {
            const fileName = (0, uuid_1.v4)() + path.extname(image.name);
            const uploadPath = uploadDirectory + "/" + fileName;
            product.images.push({ path: "/images/products/" + fileName });
            image.mv(uploadPath, function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
            });
        }
        yield product.save();
        return res.send("Files uploaded!");
    }
    catch (err) {
        next(err);
    }
});
exports.adminUpload = adminUpload;
const adminDeleteProductImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const imagePath = decodeURIComponent(req.params.imagePath);
    if (req.query.cloudinary === "true") {
        try {
            yield ProductModel_1.default.findOneAndUpdate({ _id: req.params.productId }, { $pull: { images: { path: imagePath } } }).orFail();
            return res.end();
        }
        catch (er) {
            next(er);
        }
        return;
    }
    try {
        const finalPath = path.resolve("../frontend/public") + imagePath;
        fs_1.default.unlink(finalPath, (err) => {
            if (err) {
                res.status(500).send(err);
            }
        });
        yield ProductModel_1.default.findOneAndUpdate({ _id: req.params.productId }, { $pull: { images: { path: imagePath } } }).orFail();
        return res.end();
    }
    catch (err) {
        next(err);
    }
});
exports.adminDeleteProductImage = adminDeleteProductImage;
//# sourceMappingURL=productController.js.map