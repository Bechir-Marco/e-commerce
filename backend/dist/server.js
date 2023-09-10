"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const apiRoutes_1 = __importDefault(require("./routes/apiRoutes"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
(0, db_1.default)();
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json()); // Parse JSON request bodies
app.use((0, express_fileupload_1.default)());
app.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ message: "API running..." });
}));
app.use("/api", apiRoutes_1.default);
app.use((error, req, res, next) => {
    console.error(error);
    next(error);
});
app.use((error, req, res, next) => {
    res.status(500).json({
        message: error.message,
        stack: error.stack,
    });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=server.js.map