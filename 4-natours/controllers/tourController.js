const Tour = require('../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// Validate req.body
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    //results: tours.length,
    data: {
      //tours: tours,
    },
  });
};

exports.getTour = (req, res) => {
  // const id = parseInt(req.params.id, 10);
  // const tour = tours.find((tour) => tour.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      //tour: tour,
    },
  });
};

exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'sucess',
    // data: {
    //   tour: newTour,
    // },
  });
};

exports.updateTour = async (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'tour',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
