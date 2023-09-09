import express from 'express';
const router = express.Router()

import { getProducts, getProductById, getBestsellers, adminGetProducts, adminDeleteProduct } from '../controllers/productController';
router.get("/", getProducts )
router.get("/category/:categoryName", getProducts)
router.get("/category/:categoryName/search/:searchQuery", getProducts)
router.get("/search/:searchQuery", getProducts)
router.get("/get-one/:id", getProductById)
router.get("/bestsellers", getBestsellers)


router.get("/admin", adminGetProducts)
router.delete("/admin/:id", adminDeleteProduct)

export default router;
