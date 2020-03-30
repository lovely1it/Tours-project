const fs = require('fs');
const Tour = require('./../model/toursModel');
const APIFeatures = require('./../utils/apiFeatures');

const getAllTours =  async (req, res) => {
   try{
       const tours = await Tour.find();
       //EXECUTE QUERY
    //    const features = new APIFeatures(Tour.find(), req.query)
    //    .filter()
    //    .sort()
    //    .limitingFields()
    //    .pagination();
    //    const tours = await features.query;
    
    //SEND RESPONSE
    res.status(200).json({
        status: 'success',
        results: tours.length,
        tours
    });
   }catch(err) {
       console.log(err);
       res.status(404).json({
           status: 'fail',
           message: err
       });
   }
}

const getATour = async (req, res) => {
    try{
const  tour =  await Tour.findById(req.params.id);
// Tour.find({_id: req.params.id})
    res.status(200).json({
        status: 'success',
        data: { tour }
    });
} catch(err){
    res.status(404).json({
        status: 'error',
        message: err
    });
}
}
const updateATour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
            res.status(200).json({
                status: 'success',
                data: { tour }
            });
    }catch(err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
   
    }
const deletATour = async (req, res) => {
    try{
        await Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success'
        });
    }catch(err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
    
    }
const createATour =  async (req, res) => {
  try{
    const newTour = await Tour.create(req.body);
    res.status(200).json({
        status: 'success',
        data: {
            tour: newTour
        }
    });
}catch(err) {
    res.status(400).json({
        status: 'fail',
        message: err
    });
}

}  

// GET TOUR status
const getTourStatus = async (req, res) => {
    try {
        const status = await Tour.aggregate([
            {
                $match: { ratingsAverage: { $gte: 4.5}}
            },
            {
               $group: {
                    _id: { $toUpper: '$difficulty'},
                    numTours: { $sum:1},
                    numRatings: {$sum: '$ratingsQuantity'},
                    avgRating: { $avg: '$ratingsAverage'},
                    avgPrice: { $avg: '$price'},
                    minPrice: {$min: '$price'},
                    maxPrice: { $max: '$price'}

                    }
            },
            { $sort: { avgPrice: 1}}
            // { $match: {_id: {$ne: 'EASY'}}}
        ]);
        res.status(200).json({
            status: 'success',
            length: status.length,
            data: {
                status
            }
        });
    }catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}
const getMonthlyPlan = async (req, res) => {
    try{
        const year = req.params.year * 1; 
        const plan = await Tour.aggregate([
            { $unwind: '$startDates' },
            { 
                $match: { 
                    startDates: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                }
                }
            },
            { 
                $group: {
                    _id: { $month: '$startDates'},
                    numTourStarts: { $sum: 1},
                    tours: { $push: '$name' }
                }
            },
            { 
                $addFields: { month: '$_id'}
            },
            { 
                $project: { _id: 0}
            },
            { 
                $sort: { numTourStarts: -1}
            }, 
            { 
                $limit: 12
            }  
        ]);
        res.status(200).json({
            status: 'success',
            length: plan.length,
            data: {
                plan
            }
        });
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

module.exports = {
    getAllTours,
    getATour,
    updateATour,
    createATour,
    deletATour,
    getTourStatus,
    getMonthlyPlan
}