"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var reviews = [
    {
        comment: "Review. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
        rating: 5,
        user: { _id: new mongodb_1.ObjectId(), name: "John Doe" },
    },
    {
        comment: "Review. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
        rating: 5,
        user: { _id: new mongodb_1.ObjectId(), name: "John Doe" },
    },
    {
        comment: "Review. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
        rating: 5,
        user: { _id: new mongodb_1.ObjectId(), name: "John Doe" },
    },
    {
        comment: "Review. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
        rating: 4,
        user: { _id: new mongodb_1.ObjectId(), name: "John Doe" },
    },
    {
        comment: "Review. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
        rating: 3,
        user: { _id: new mongodb_1.ObjectId(), name: "John Doe" },
    },
];
exports.default = reviews;
