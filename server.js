const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const app = require('./app');
//console.log(process.env);
//MONGODB CONNECTION TO NODEJS APP
mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() =>  console.log('DB connected successfully!'));

const port= process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log( `App is listening at port ${port}..... `);
})
//jhhjjfhgdjkfhgjkdfhgjdh
//new comment in dev branch