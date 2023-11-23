import mongoose, { Schema } from "mongoose";

const reviewSchema = new mongoose.Schema({
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'movies',
    },
    platform: {
        type: Schema.Types.ObjectId,
        ref: 'Platform',
    },
    author: {
        type: String,
        required: [true, 'Author is required']
    },
    body: {
        type: String,
        required: [true, 'Body is required']
    },
    score: {
        type: Number,
        required: [true, 'Score is required'],
        min: 0,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export const ReviewModel = mongoose.model('reviews', reviewSchema);
