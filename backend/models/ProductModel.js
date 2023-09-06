"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ReviewModel_1 = require("./ReviewModel");
var imageSchema = new mongoose_1.default.Schema({
    path: { type: String, required: true }
});
var productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
    },
    reviewsNumber: {
        type: Number,
    },
    sales: {
        type: Number,
        default: 0,
    },
    attrs: [
        {
            key: { type: String },
            value: { type: String }
        },
        // [{ key: "color", value: "red" }, { key: "size", value: "1 TB" }]
    ],
    images: [imageSchema],
    reviews: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: ReviewModel_1.default,
        }
    ],
}, {
    timestamps: true,
});
productSchema.index({ name: "text", description: "text" }, { name: "TextIndex" });
productSchema.index({ "attrs.key": 1, "attrs.value": 1 });
// productSchema.index({name: -1})
var Product = mongoose_1.default.model("Product", productSchema);
exports.default = Product;
