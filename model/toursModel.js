const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        unique: true
    },
    durations: {
        type: Number,
        required: [true, 'duration is required']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'maxGroupSize is required']
    },
    difficulty: {
        type: String,
        required: [true, 'difficulty is required']
    },
    ratingsAverage: {
        type: Number,
        default: 4.5
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'price is required']
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, 'imageCover is required']
    },
    images: [String],
    createdAt: {
        type: Date,
        default: new Date()
    },
    startDates: [Date]
});
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;