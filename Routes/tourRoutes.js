const express = require('express');
const tourController = require('../controller/tourController'); 
const router = express.Router();
//router.param('id', tourController.checkId);
router.route('/').get(tourController.getAllTours).post(tourController.createATour);
router.route('/:id').get(tourController.getATour).patch(tourController.updateATour).delete(tourController.deletATour);

module.exports = router;