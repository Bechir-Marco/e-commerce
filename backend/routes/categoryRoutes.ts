import express from 'express';
const router = express.Router();

import { getCategories, newCategory, deleteCategory, saveAttr } from "../controllers/categoryController";
import { verifyIsLoggedIn, verifyIsAdmin } from '../middleWare/verifyAuthToken'

router.get("/", getCategories);

/******Admin Routes ********/
router.use(verifyIsLoggedIn);
router.use(verifyIsAdmin);
router.post("/", newCategory);
router.delete("/:category", deleteCategory);
router.post("/attr", saveAttr);

export default router;
