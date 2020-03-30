const express = require('express');
const morgan = require('morgan');
const app = express();
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');
const tourRouter = require('./Routes/tourRoutes');
const userRouter = require('./Routes/userRoutes');
//1). middleware will modifies coming request data
app.use(express.json());
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
app.use(express.static(`${__dirname}/starter/public`));
app.use((req, res, next)=>{
    console.log('hello middleware is here',);
    next();
});
app.use((req, res, next) => {
    req.requestedAt = new Date().toISOString();
    console.log(req.requestedAt);
    next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//MIDDLEWARE TO HANDLE ALL UNDEFINED ROUTES
app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     status: 'fail',
    //     message: `can't find ${req.originalUrl} on this server!`
    // });
    // const err = new Error(`can't find ${req.originalUrl} on this server!`);
    // err.status = 'fail';
    // err.statusCode = 404;

    /*
    * if any parameter you are passing in next function that will be considered automatically its error parameter
    * and in any middleware if next function with err parameter is called it will skip all the middleware stacked-up and will
    * jump to global error handler middleware and will handle the error.
    */
    // next(err);
    next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
});

//GLOBAL ERROR HANDLER middleware

app.use(globalErrorHandler);

module.exports = app;