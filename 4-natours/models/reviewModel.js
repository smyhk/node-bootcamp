const mongoose = require('mongoose');
const Tour = require('./tourModel');

// Reviews are modeled with parent referencing
const reviewSchema = mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review cannot be empty!'],
      maxlength: [250, 'A tour name must have less than 250 characters'],
    },
    rating: {
      type: Number,
      default: 4.5,
      min: [1.0, 'Rating must be at least 1'],
      max: [5.0, 'Rating cannot be more than 5'],
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour.'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must have a user.'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function (next) {
  // this.populate({
  //   path: 'tour',
  //   select: 'name',
  // }).populate({
  //   path: 'user',
  //   select: 'name photo',
  // });

  this.populate({
    path: 'user',
    select: 'name photo',
  });

  next();
});

// reviewSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'user',
//     select: '-__v, -passwordChangedAt',
//   });

//   next();
// });

reviewSchema.statics.calcAverageRating = async function (tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        numRatings: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].numRatings,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

// Prevent users from reviewing the same tour more than once
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

// Calls the static calcAverageRating method after a new review is created
reviewSchema.post('save', function () {
  // this -> current review
  this.constructor.calcAverageRating(this.tour);
});

// 1)
// Capture the query object when a rating is updated or deleted
// Append the the query object to the r prop on `this`
reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  next();
});

// 2)
// Executes the calcAverageRating method on the query in `r` prop on `this`
reviewSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calcAverageRating(this.r.tour);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
