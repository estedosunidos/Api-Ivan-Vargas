import mongoose, { Schema } from "mongoose";

const moviesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    slug: {
        type: String,
        unique: true, 
    },
    director: {
        type: String,
        required: [true, 'Director is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    score: {
        type: Number,
        required: [true, 'Score is required']
    },
    platforms: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Platform'
        }
    
    ],
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
        
    ],
});


export const MoviesModel = mongoose.model('movies', moviesSchema);
