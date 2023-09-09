import Product from "../models/ProductModel";
import recordsPerPage from '../config/pagination'


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
