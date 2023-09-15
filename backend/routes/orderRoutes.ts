import express from 'express';
const router = express.Router();
import { verifyIsLoggedIn, verifyIsAdmin } from '../middleWare/verifyAuthToken';
import {
    getUserOrders, getOrder, createOrder,
    updateOrderToPaid, updateOrderToDelivered, getOrders, getOrderForAnalysis
} from '../controllers/orderController';

router.use(verifyIsLoggedIn);
router.get("/", getUserOrders);
router.get("/user/:id", getOrder);
router.post("/", createOrder);
router.put("/paid/:id", updateOrderToPaid);


// admin routes
router.use(verifyIsAdmin);
router.put("/delivered/:id", updateOrderToDelivered);
router.get("/admin", getOrders);
router.get("/analysis/:date", getOrderForAnalysis);
export default router;