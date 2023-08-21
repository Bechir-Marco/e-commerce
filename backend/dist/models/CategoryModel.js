"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const categorySchema = new mongoose_1.default.Schema({
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
//# sourceMappingURL=CategoryModel.js.map