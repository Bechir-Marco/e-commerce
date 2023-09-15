import Product  from '../models/ProductModel';
import Order from '../models/OrderModel';

export const getUserOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user._id } );
        res.send(orders);
    } catch (error) {
        next(error);
    }
};
export const getOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "-password -isAdmin -_id -__v -createdAt -updatedAt").orFail();
        res.send(order);
    } catch (err) {
        next(err);
    }
};

export const createOrder = async (req, res, next) => {
    try {
        const { cartItems, orderTotal, paymentMethod } = req.body;
        if (!cartItems || !orderTotal || !paymentMethod) {
            return res.status(400).send("All inputs are required");
        }

        const ids = cartItems.map((item) => {
            return item.productID;
        });
        const qty = cartItems.map((item) => {
            return Number(item.quantity);
        });

        await Product.find({ _id: { $in: ids } }).then((products) => {
            products.forEach(function (product, idx) {
                product.sales += qty[idx];
                product.save();
            });
        });

        const order = new Order({
            user: req.user._id,
            orderTotal: orderTotal,
            cartItems: cartItems,
            paymentMethod: paymentMethod,
        });
        const createdOrder = await order.save();
        res.status(201).send(createdOrder);

    } catch (err) {
        next(err);
    }
};
export const updateOrderToPaid = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).orFail();
        order.isPaid = true;
        order.paidAt = new Date();

        const updatedOrder = await order.save();
        res.send(updatedOrder);

    } catch (err) {
        next(err);
    }
};

export const updateOrderToDelivered = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).orFail();
        order.isDelivered = true;
        order.deliveredAt = new Date ()
        const updatedOrder = await order.save();
        res.send(updatedOrder);
    } catch (err) {
        next(err);
    }
};
export const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({}).populate("user", "-password").sort({ paymentMethod: "desc" });
        res.send(orders);
    } catch (err) {
        next(err);
    }
};
export const getOrderForAnalysis = async (req, res, next) => {
    try {
      
        const requestedDate = req.params.date;

      
        const startDate = new Date(requestedDate);
        startDate.setHours(0, 0, 0, 0); 

        console.log('startDate', startDate);
        
        const endDate = new Date(requestedDate);
        endDate.setHours(23, 59, 59, 999); 

        console.log('endDAte', endDate);

        
        const orders = await Order.find({
            createdAt: {
                $gte: startDate,
                $lte: endDate,
            }
        }).sort({ createdAt: "asc" });

       
        res.send(orders);
    } catch (err) {
        next(err);
    }
};

