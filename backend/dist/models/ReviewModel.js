"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserModel_1 = __importDefault(require("./UserModel"));
const reviewSchema = new mongoose_1.default.Schema({
    comment: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: UserModel_1.default,
    },
}, {
    timestamps: true,
});
const Review = mongoose_1.default.model("Review", reviewSchema);
exports.default = Review;
//# sourceMappingURL=ReviewModel.js.map