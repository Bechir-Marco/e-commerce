"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ReviewModel_1 = __importDefault(require("./ReviewModel"));
const imageSchema = new mongoose_1.default.Schema({
    path: { type: String, required: true }
});
const productSchema = new mongoose_1.default.Schema({
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
const Product = mongoose_1.default.model("Product", productSchema);
exports.default = Product;
//# sourceMappingURL=ProductModel.js.map