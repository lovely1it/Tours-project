/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const Tour = require('./../../../model/toursModel');

dotenv.config({ path: './config.env' });

//MONGODB CONNECTION TO NODEJS APP
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log('DB connected successfully!'));

//READ JSON FILE
const tours = JSON.parse(fs.readFileSync(  `${__dirname}/tours-simple.json`, 'utf-8'));

//import data from json to MONGODB
const importData = async () => {

    try{
        await Tour.create(tours);
        console.log('Data successfully imported');
    }catch (err) {
        console.log(err);
    }
    process.exit();
};
// delete data from DB

const deleteData =  async () => {
    try{
        await Tour.deleteMany();
        console.log('Data successfully deleted');
    }catch(err) {
        console.log(err);
    }
    process.exit();
};

if(process.argv[2] === '--import') {
    importData();
}
else if(process.argv[2] === '--delete'){
    deleteData();
}
//console.log(process.argv);