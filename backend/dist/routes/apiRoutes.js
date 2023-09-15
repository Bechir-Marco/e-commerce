"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const productRoutes_1 = __importDefault(require("./productRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const categoryRoutes_1 = __importDefault(require("./categoryRoutes"));
const orderRoutes_1 = __importDefault(require("./orderRoutes"));
app.use("/products", productRoutes_1.default);
app.use("/categories", categoryRoutes_1.default);
app.use("/users", userRoutes_1.default);
app.use("/orders", orderRoutes_1.default);
exports.default = app;
//# sourceMappingURL=apiRoutes.js.map