const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

// router.use();

// Render base template
router.get(
  '/',
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewController.getOverview
);

router.get('/tour/:slug', authController.isLoggedIn, viewController.getTour);

// Login
router.get('/login', authController.isLoggedIn, viewController.getLoginForm);

// Current user
router.get('/me', authController.protect, viewController.getAccount);

// Current user's bookings
router.get('/my-tours', authController.protect, viewController.getMyTours);

// Needed to urlecoded data
// router.post('/submit-user-data', authController.protect, viewController.updateUserData);

module.exports = router;
