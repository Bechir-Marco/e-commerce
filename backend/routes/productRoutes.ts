import express from 'express';
const router = express.Router()

import { getProducts, getProductById } from '../controllers/productController';
router.get("/", getProducts )
router.get("/category/:categoryName", getProducts)
router.get("/category/:categoryName/search/:searchQuery", getProducts)
router.get("/search/:searchQuery", getProducts)
router.get("/get-one/:id", getProductById)

export default router;
