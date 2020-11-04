const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.use();

// Render base template
router.get('/', authController.isLoggedIn, viewController.getOverview);
router.get('/tour/:slug', authController.isLoggedIn, viewController.getTour);

// Login
router.get('/login', authController.isLoggedIn, viewController.getLoginForm);

// Current user
router.get('/me', authController.protect, viewController.getAccount);

// Needed to urlecoded data
// router.post('/submit-user-data', authController.protect, viewController.updateUserData);

module.exports = router;
