const express = require('express');
const morgan = require('morgan');
const app = express();
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
//app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getATour);
// app.patch('/api/v1/tours/:id', updateATour);
// app.delete('/api/v1/tours/:id', deletATour);
//app.post('/api/v1/tours',createATour);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
//START SERVER..
module.exports = app;