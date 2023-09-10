"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const productController_1 = require("../controllers/productController");
router.get("/", productController_1.getProducts);
router.get("/category/:categoryName", productController_1.getProducts);
router.get("/category/:categoryName/search/:searchQuery", productController_1.getProducts);
router.get("/search/:searchQuery", productController_1.getProducts);
router.get("/get-one/:id", productController_1.getProductById);
router.get("/bestsellers", productController_1.getBestsellers);
router.get("/admin", productController_1.adminGetProducts);
router.delete("/admin/:id", productController_1.adminDeleteProduct);
router.post("/admin", productController_1.adminCreateProduct);
router.put("/admin/:id", productController_1.adminUpdateProduct);
router.post("/admin/upload", productController_1.adminUpload);
exports.default = router;
//# sourceMappingURL=productRoutes.js.map