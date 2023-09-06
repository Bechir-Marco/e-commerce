import express from 'express';
const router = express.Router();

import { getCategories, newCategory, deleteCategory, saveAttr } from "../controllers/categoryController";


router.get("/", getCategories);
router.post("/", newCategory);
router.delete("/:category", deleteCategory);
router.post("/attr", saveAttr);

export default router;
