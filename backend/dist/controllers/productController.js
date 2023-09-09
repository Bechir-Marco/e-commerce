"use strict";
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
exports.getProductById = exports.getProducts = void 0;
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const pagination_1 = __importDefault(require("../config/pagination"));
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
//# sourceMappingURL=productController.js.map