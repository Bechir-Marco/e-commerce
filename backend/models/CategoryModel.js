"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var categorySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        default: "default category description",
    },
    image: {
        type: String,
        default: "/images/tablets-category.png",
    },
    attrs: [
        {
            key: { type: String },
            value: [{ type: String }],
        },
    ],
});
exports.default = mongoose_1.default.model("Category", categorySchema);
