import Product from "../models/ProductModel";
import recordsPerPage from '../config/pagination'
import imageValidate from '../utils/imageValidation'
import * as path from "path";
import { v4 as uuidv4 } from "uuid"
import  fs  from "fs"
export const getProducts = async (req, res, next) => {
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
                if (item) return new RegExp("^" + item);
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
                } else return acc;
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

        const totalProducts = await Product.countDocuments(query);
        const products = await Product.find(query)
            .select(select)
            .skip(recordsPerPage * (pageNum - 1))
            .sort(sort)
            .limit(recordsPerPage);

        res.json({
            products,
            pageNum,
            paginationLinksNumber: Math.ceil(totalProducts / recordsPerPage),
        });
    } catch (error) {
        next(error);
    }
};
export const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate("reviews")
            .orFail();
        res.json(product);
    } catch (err) {
        next(err);
    }
}; 
export const getBestsellers = async (req, res, next) => {
    try {
        const products = await Product.aggregate([
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
    } catch (err) {
        next(err);
    }
};
export const adminGetProducts = async (req, res, next) => {
    try {
        const products = await Product.find({})
            .sort({ category: 1 })
            .select("name price category");
        return res.json(products);
    } catch (err) {
        next(err);
    }
};
export const adminDeleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).orFail();
        await product.deleteOne();
        res.json({ message: "product removed" });
    } catch (err) {
        next(err);
    }
};
export const adminCreateProduct = async (req, res, next) => {
    try {
        const product = new Product();
        const { name, description, count, price, category, attributesTable } =
            req.body;
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
        await product.save();

        res.json({
            message: "product created",
            productId: product._id,
        });
    } catch (err) {
        next(err);
    }
};


export const adminUpdateProduct = async (req, res, next)=> {
        try {
            const product = await Product.findByIdAndUpdate(req.params.id).orFail();
            const { name, description, count, price, category, attributesTable } =
                req.body;
            product.name = name 
            product.description = description 
            product.count = count 
            product.price = price 
            product.category = category 
            if (attributesTable && attributesTable.length > 0) {
                product.attrs = [];
                attributesTable.map((item) => {
                    product.attrs.push(item);
                });
            } else {
                product.attrs = [];
            }
            await product.save();
            res.json({
                message: "product updated",
            });
        } catch (err) {
            next(err);
        }
};
interface AdminCreateProductResponse {
    message: string;
    productId: string; // Assurez-vous que le type correspond à l'ID du produit
}
export const adminUpload = async (req, res, next) => {
    try {
        
        if (!req.query.productId) {
            const productCreationResponse = await adminCreateProduct(req, res, next);

            const newlyCreatedProductId = (productCreationResponse as unknown as AdminCreateProductResponse).productId;
            req.query.productId = newlyCreatedProductId;
        }
    } catch (err) {
        console.log('err', err);
        next(err);
    }
    if (req.query.cloudinary === "true") {
        try {
            const product = await Product.findById(req.query.productId).orFail();
            console.log('product',product)
            product.images.push({ path: req.body.url });
            await product.save();
        } catch (err) {
            console.log('err',err)
            next(err);
        }
        return;
    }
    try {
        if (!req.files || !!req.files.images === false) {
            return res.status(400).send("No files were uploaded.");
        }
        const validateResult = imageValidate(req.files.images);
        if (validateResult.error) {
            return res.status(400).send(validateResult.error);
        }
        const uploadDirectory = path.resolve(
            __dirname,
            "../../frontend",
            "public",
            "images",
            "products"
        );

        const product = await Product.findById(req.query.productId).orFail();

        let imagesTable = [];
        if (Array.isArray(req.files.images)) {
            imagesTable = req.files.images;
        } else {
            imagesTable.push(req.files.images);
        }

        for (const image of imagesTable) {
            const fileName = uuidv4() + path.extname(image.name);
            const uploadPath = uploadDirectory + "/" + fileName;
        
            product.images.push({ path: "/images/products/" + fileName });
            image.mv(uploadPath, function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
            });
        }
        await product.save();
        return res.send("Files uploaded!");
    } catch (err) {
        next(err);
    }
};
export const adminDeleteProductImage = async (req, res, next) => {
    const imagePath = decodeURIComponent(req.params.imagePath);
    if (req.query.cloudinary === "true") {
        try {
            await Product.findOneAndUpdate({ _id: req.params.productId }, { $pull: { images: { path: imagePath } } }).orFail();
            return res.end();
        } catch (er) {
            next(er);
        }
        return;
    }
    try {
        
        const finalPath = path.resolve("../frontend/public") + imagePath;

        
        fs.unlink(finalPath, (err) => {
            if (err) {
                res.status(500).send(err);
            }
        });
        await Product.findOneAndUpdate(
            { _id: req.params.productId },
            { $pull: { images: { path: imagePath } } }
        ).orFail();
        return res.end();
    } catch (err) {
        next(err);
    }
}