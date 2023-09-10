import express from 'express';
const router = express.Router()

import { getProducts, getProductById, getBestsellers, adminGetProducts, adminDeleteProduct, adminCreateProduct, adminUpdateProduct, adminUpload, adminDeleteProductImage } from '../controllers/productController';
router.get("/", getProducts )
router.get("/category/:categoryName", getProducts)
router.get("/category/:categoryName/search/:searchQuery", getProducts)
router.get("/search/:searchQuery", getProducts)
router.get("/get-one/:id", getProductById)
router.get("/bestsellers", getBestsellers)


router.get("/admin", adminGetProducts)
router.delete("/admin/:id", adminDeleteProduct)
router.post("/admin", adminCreateProduct)
router.put("/admin/:id", adminUpdateProduct)
router.post("/admin/upload", adminUpload)
router.delete("/admin/image/:imagePath/:productId", adminDeleteProductImage)

export default router;
