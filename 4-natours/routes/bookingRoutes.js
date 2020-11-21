const express = require('express');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

// Users must be authenticated
router.use(authController.protect);

router.get('/checkout-session/:tourId', bookingController.getCheckoutSession);

// Only admins and lead guides have access to these routes
router.use(authController.restrictTo('admin', 'lead-guide'));

router
  .route('/')
  .get(bookingController.getAllBookings)
  .post(bookingController.createBookingCheckout);

router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updteBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
