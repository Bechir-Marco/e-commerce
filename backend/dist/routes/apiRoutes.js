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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
app.get("/logout", (req, res) => {
    return res.clearCookie("access_token").send("access token cleared");
});
app.get("/get-token", (req, res) => {
    try {
        const accessToken = req.cookies["access_token"];
        const decoded = jsonwebtoken_1.default.verify(accessToken, process.env.JWT_SECRET_KEY);
        return res.json({ token: decoded.name, isAdmin: decoded.isAdmin });
    }
    catch (err) {
        return res.status(401).send("Unauthorized. Invalid Token");
    }
});
app.use("/products", productRoutes_1.default);
app.use("/categories", categoryRoutes_1.default);
app.use("/users", userRoutes_1.default);
app.use("/orders", orderRoutes_1.default);
exports.default = app;
//# sourceMappingURL=apiRoutes.js.map