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
const db_1 = __importDefault(require("../config/db"));
(0, db_1.default)();
const categories_1 = __importDefault(require("./categories"));
const CategoryModel_1 = __importDefault(require("../models/CategoryModel"));
const importData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield CategoryModel_1.default.collection.dropIndexes();
        yield CategoryModel_1.default.collection.deleteMany({});
        yield CategoryModel_1.default.insertMany(categories_1.default);
        console.log("Seeder data proceeded successfully");
        process.exit();
    }
    catch (error) {
        console.error("Error while proccessing seeder data", error);
        process.exit(1);
    }
});
importData();
//# sourceMappingURL=seeder.js.map