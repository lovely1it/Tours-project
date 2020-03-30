const express = require('express');
const tourController = require('../controller/tourController'); 
const router = express.Router();
//router.param('id', tourController.checkId);
router.route('/tour-status').get(tourController.getTourStatus);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);
router.route('/').get(tourController.getAllTours).post(tourController.createATour);
router.route('/:id').get(tourController.getATour).patch(tourController.updateATour).delete(tourController.deletATour);

module.exports = router;

  //  let data2 = await ProductDetails.find();
        //  var i=0;
        //  var allProducts = data1.forEach(element => { 
        //      var pid = element._id;
        //      console.log(pid, 'pid ,');
        //      var value = data2.findIndex(pid);
        //      console.log(value, ' value, ');
        //      element['product-details'] = data2[value];
        //      console.log(element, 'element');
        //  });
        //  console.log(allProducts, ',allProducts..');
        // var allProducts = {...data };
        // var i=0;
        // for (ele in data2){
        //     ele.pop();
        //     console.log(ele.pop());
        //     allProducts[i].push(ele);
        //     i++;
        // }
        // Product.find().populate('price').exec(function(err, c) {
        //     if (err) { return console.log(err); }
        
        //     console.log(c);
        // });