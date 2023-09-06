"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserModel_1 = require("./UserModel");
var orderSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: UserModel_1.default,
    },
    orderTotal: {
        itemsCount: { type: Number, required: true },
        cartSubtotal: { type: Number, required: true },
    },
    cartItems: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            image: { path: { type: String, required: true } },
            quantity: { type: Number, required: true },
            count: { type: Number, required: true },
        }
    ],
    transactionResult: {
        status: { type: String },
        createTime: { type: String },
        amount: { type: Number },
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false,
    },
    deliveredAt: {
        type: Date,
    },
}, {
    timestamps: true,
});
var Order = mongoose_1.default.model("Order", orderSchema);
exports.default = Order;
