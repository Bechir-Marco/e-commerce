// "use strict";
// var __assign = (this && this.__assign) || function () {
//     __assign = Object.assign || function(t) {
//         for (var s, i = 1, n = arguments.length; i < n; i++) {
//             s = arguments[i];
//             for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
//                 t[p] = s[p];
//         }
//         return t;
//     };
//     return __assign.apply(this, arguments);
// };
// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };
// var __generator = (this && this.__generator) || function (thisArg, body) {
//     var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
//     return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
//     function verb(n) { return function (v) { return step([n, v]); }; }
//     function step(op) {
//         if (f) throw new TypeError("Generator is already executing.");
//         while (g && (g = 0, op[0] && (_ = 0)), _) try {
//             if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
//             if (y = 0, t) op = [op[0] & 2, t.value];
//             switch (op[0]) {
//                 case 0: case 1: t = op; break;
//                 case 4: _.label++; return { value: op[1], done: false };
//                 case 5: _.label++; y = op[1]; op = [0]; continue;
//                 case 7: op = _.ops.pop(); _.trys.pop(); continue;
//                 default:
//                     if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
//                     if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
//                     if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
//                     if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
//                     if (t[2]) _.ops.pop();
//                     _.trys.pop(); continue;
//             }
//             op = body.call(thisArg, _);
//         } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
//         if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
//     }
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// var db_1 = require("../config/db");
// var categories_1 = require("./categories");
// var CategoryModel_1 = require("../models/CategoryModel");
// var ProductModel_1 = require("../models/ProductModel");
// var products_1 = require("./products");
// var ReviewModel_1 = require("../models/ReviewModel");
// var reviews_1 = require("./reviews");
// var UserModel_1 = require("../models/UserModel");
// var users_1 = require("./users");
// var OrderModel_1 = require("../models/OrderModel");
// var orders_1 = require("./orders");
// var importData = function () { return __awaiter(void 0, void 0, void 0, function () {
//     var reviews_2, productSample, error_1;
//     return __generator(this, function (_a) {
//         switch (_a.label) {
//             case 0:
//                 _a.trys.push([0, 17, , 18]);
//                 return [4 /*yield*/, (0, db_1.default)()];
//             case 1:
//                 _a.sent();
//                 return [4 /*yield*/, CategoryModel_1.default.collection.dropIndexes()];
//             case 2:
//                 _a.sent();
//                 return [4 /*yield*/, CategoryModel_1.default.collection.deleteMany({})];
//             case 3:
//                 _a.sent();
//                 return [4 /*yield*/, CategoryModel_1.default.insertMany(categories_1.default)];
//             case 4:
//                 _a.sent();
//                 return [4 /*yield*/, ProductModel_1.default.collection.dropIndexes()];
//             case 5:
//                 _a.sent();
//                 return [4 /*yield*/, ProductModel_1.default.collection.deleteMany()];
//             case 6:
//                 _a.sent();
//                 return [4 /*yield*/, ReviewModel_1.default.collection.dropIndexes()];
//             case 7:
//                 _a.sent();
//                 return [4 /*yield*/, ReviewModel_1.default.collection.deleteMany()];
//             case 8:
//                 _a.sent();
//                 return [4 /*yield*/, ReviewModel_1.default.insertMany(reviews_1.default)];
//             case 9:
//                 reviews_2 = _a.sent();
//                 productSample = products_1.default.map(function (p) {
//                     reviews_2.map(function (r) {
//                         p.reviews.push(r._id);
//                     });
//                     return __assign({}, p);
//                 });
//                 return [4 /*yield*/, ProductModel_1.default.insertMany(productSample)];
//             case 10:
//                 _a.sent();
//                 return [4 /*yield*/, UserModel_1.default.collection.dropIndexes()];
//             case 11:
//                 _a.sent();
//                 return [4 /*yield*/, UserModel_1.default.collection.deleteMany()];
//             case 12:
//                 _a.sent();
//                 return [4 /*yield*/, UserModel_1.default.collection.insertMany(users_1.default)];
//             case 13:
//                 _a.sent();
//                 return [4 /*yield*/, OrderModel_1.default.collection.dropIndexes()];
//             case 14:
//                 _a.sent();
//                 return [4 /*yield*/, OrderModel_1.default.collection.deleteMany()];
//             case 15:
//                 _a.sent();
//                 return [4 /*yield*/, OrderModel_1.default.collection.insertMany(orders_1.default)];
//             case 16:
//                 _a.sent();
//                 console.log("Seeder data proceeded successfully");
//                 process.exit();
//                 return [3 /*break*/, 18];
//             case 17:
//                 error_1 = _a.sent();
//                 console.error("Error while proccessing seeder data", error_1);
//                 process.exit(1);
//                 return [3 /*break*/, 18];
//             case 18: return [2 /*return*/];
//         }
//     });
// }); };
// importData();
