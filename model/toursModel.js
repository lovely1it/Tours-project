const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');


/**
 * min & max for number and for date datatype
 * maxlength & minlength for string datatype
 * enum only for string datatype
 */
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        unique: true,
        maxlength: [40, 'A tour name must have less or equal to 40 characters'],
        minlength: [5, 'A tour name must have at least 5 characters']
        // validator library is being used on Tour schema
        // validate: [ validator.isAlpha, 'Tour name must be only containing characters']
    },
    slug: String,
    duration: {
        type: Number,
        required: [true, 'duration is required']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'maxGroupSize is required']
    },
    difficulty: {
        type: String,
        required: [true, 'difficulty is required'],
        enum: {
            values: ['Difficult', 'easy', 'medium'],
            message: 'Difficulty is either easy, medium or difficult'
        }
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1.0, 'Rating must be above 1.0'],
        max: [5.0, 'Rating must ne below  5.0']
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'price is required']
    },
    priceDiscount: {
        type: Number,
        //CUSTOM VALIDATOR THIS HOW IT IS USED ON VALIDATE PROPERY IN TOUR SCHEMA
        validate: {
            validator: function (value) {
                return value < this.price;
            },
            message: 'Discount price({VALUE}) must be below regular price '
        }
    },
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
        default: new Date(),
        select: false
    },
    startDates: [Date],
    seceretTour: {
        type: Boolean,
        default: false
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true}
});
//virtual property used coz conversion from one days to weeks
tourSchema.virtual('durationWeeks').get(function (){
    return this.duration / 7;
});
/*DOCUMENT MIDDLEWARE: runs before saving document in DB, works only on .save(), .create()
* doesn't work with insertMany()
* EVENT 'save' is called pre hook 
* here this will have current document which is being save in db
*/
//pre hooks on save event
tourSchema.pre('save', function (next){
    console.log(this, 'DB------');
    this.slug = slugify(this.name, { lower: true });
    next();
});
// tourSchema.pre('save', function (next){
//     console.log('will save document....');
//     next();
// });
// //post hooks on save event
// tourSchema.post('save', function(doc, next){
//     console.log(doc);
//     next();
// });

//QUERY MIDDLEWARE 
/*
    -> this keyword will point cuurent executing query
    ->this will get executed before executing find query
    /^find/--> regular  exp all string starts with find will be taken care off
*/ 
tourSchema.pre(/^find/, function(next){
this.find({ seceretTour: { $ne: true }});
this.start = Date.now();
next();
});

tourSchema.post(/^find/, function(docs, next){
    //time took to execute the find query
    console.log(`total time took ${Date.now() - this.start} milliseconds`);
    // console.log(docs);
    next();
});

//AGGREGATION MIDDLEWARE  
tourSchema.pre('aggregate', function (next){
    this.pipeline().unshift( { $match:{ seceretTour: { $ne: true} } });
    console.log(this.pipeline(), '------------');
    next();
})

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;