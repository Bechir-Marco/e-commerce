"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var reviewSchema = new mongoose_1.default.Schema({
    comment: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    user: {
        _id: { type: mongoose_1.default.Schema.Types.ObjectId, required: true },
        name: { type: String, required: true },
    },
}, {
    timestamps: true,
});
var Review = mongoose_1.default.model("Review", reviewSchema);
exports.default = Review;
