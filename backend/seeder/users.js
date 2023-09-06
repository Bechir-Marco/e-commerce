"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcryptjs");
var mongodb_1 = require("mongodb");
var myObjectId = new mongodb_1.ObjectId("625add3d78fb449f9d9fe2ee");
var users = [
    {
        name: 'admin',
        lastName: 'admin',
        email: 'admin@admin.com',
        password: bcrypt.hashSync('admin@admin.com', 10),
        isAdmin: true,
    },
    {
        _id: myObjectId,
        name: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
        password: bcrypt.hashSync('john@doe.com', 10),
    },
];
exports.default = users;
