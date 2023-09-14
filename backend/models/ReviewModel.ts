import mongoose from "mongoose";
import User from "./UserModel";

const reviewSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    user: {
         type: mongoose.Schema.Types.ObjectId,
        ref: User,
    },
}, {
    timestamps: true,
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
