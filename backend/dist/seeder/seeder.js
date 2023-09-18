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
const categories_1 = __importDefault(require("./categories"));
const CategoryModel_1 = __importDefault(require("../models/CategoryModel"));
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const products_1 = __importDefault(require("./products"));
const ReviewModel_1 = __importDefault(require("../models/ReviewModel"));
const reviews_1 = __importDefault(require("./reviews"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const users_1 = __importDefault(require("./users"));
const OrderModel_1 = __importDefault(require("../models/OrderModel"));
const orders_1 = __importDefault(require("./orders"));
const importData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.default)();
        yield CategoryModel_1.default.collection.dropIndexes();
        yield CategoryModel_1.default.collection.deleteMany({});
        yield CategoryModel_1.default.insertMany(categories_1.default);
        yield ProductModel_1.default.collection.dropIndexes();
        yield ProductModel_1.default.collection.deleteMany();
        yield ReviewModel_1.default.collection.dropIndexes();
        yield ReviewModel_1.default.collection.deleteMany();
        const reviews = yield ReviewModel_1.default.insertMany(reviews_1.default);
        const productSample = products_1.default.map((p) => {
            reviews.map((r) => {
                p.reviews.push(r._id);
            });
            return Object.assign({}, p);
        });
        yield ProductModel_1.default.insertMany(productSample);
        yield UserModel_1.default.collection.dropIndexes();
        yield UserModel_1.default.collection.deleteMany();
        yield UserModel_1.default.collection.insertMany(users_1.default);
        yield OrderModel_1.default.collection.dropIndexes();
        yield OrderModel_1.default.collection.deleteMany();
        yield OrderModel_1.default.collection.insertMany(orders_1.default);
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